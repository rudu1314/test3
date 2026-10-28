import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientService } from '../@services/http-client.service';

@Component({
  selector: 'app-apitest2',
  imports: [RouterLink],
  templateUrl: './apitest2.component.html',
  styleUrl: './apitest2.component.scss',
})
export class Apitest2Component implements OnInit {
  private readonly http = inject(HttpClientService);
  private readonly apiUrl =
    'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-077?Authorization=CWA-281F449D-E680-4A96-9E2C-3103052634EF&format=JSON';

  locations: any[] = [];
  selectedLocationIndex = 0;
  selectedDayIndex = 0;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.http.getApi(this.apiUrl).subscribe({
      next: (response: any) => {
        this.locations = response?.records?.Locations?.[0]?.Location ?? [];
        this.loading = false;
        if (!this.locations.length) {
          this.errorMessage = '目前無法取得天氣資料，請稍後再試。';
          return;
        }
        this.selectDay(0);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = '天氣資料載入失敗，請稍後重新整理。';
      },
    });
  }

  get selectedLocation(): any {
    return this.locations[this.selectedLocationIndex];
  }

  get locationName(): string {
    return this.selectedLocation?.LocationName ?? '臺南市';
  }

  get timeEntries(): any[] {
    return this.selectedLocation?.WeatherElement?.[0]?.Time ?? [];
  }

  get availableDays(): { label: string; date: string }[] {
    const dates = [...new Set(this.timeEntries.map((item: any) => item.DataTime?.slice(0, 10)).filter(Boolean))];
    return dates.slice(0, 3).map((date: string, index: number) => ({
      label: ['今日', '明日', '後天'][index] ?? date,
      date,
    }));
  }

  get activeDate(): string {
    return this.availableDays[this.selectedDayIndex]?.date ?? '';
  }

  get dayEntries(): any[] {
    return this.timeEntries.filter((item: any) => item.DataTime?.startsWith(this.activeDate));
  }

  get currentEntry(): any {
    return this.dayEntries[0] ?? this.timeEntries[0];
  }

  get temperature(): string {
    return this.valueAt(this.currentEntry, 'Temperature') || '--';
  }

  get weatherDescription(): string {
    return this.weatherValue('Weather') || '天氣資料更新中';
  }

  get weatherIcon(): string {
    return this.iconFor(this.weatherDescription, this.weatherCode());
  }

  get hourlyForecast(): any[] {
    return this.dayEntries.slice(0, 6).map((entry: any) => {
      const index = this.timeEntries.indexOf(entry);
      const weatherIndex = this.findElementIndex('天氣現象', '天氣');
      const weather = this.elementValue(weatherIndex, Math.floor(index / 3), 'Weather');
      const code = this.elementValue(weatherIndex, Math.floor(index / 3), 'WeatherCode');
      return {
        time: entry.DataTime?.slice(11, 16) ?? '--:--',
        temperature: this.valueAt(entry, 'Temperature') || '--',
        humidity: this.elementValue(2, index, 'RelativeHumidity') || '--',
        weather: weather || '多雲',
        icon: this.iconFor(weather, code),
      };
    });
  }

  get metrics(): { label: string; value: string; unit: string; icon: string; note: string; progress: number }[] {
    const index = Math.max(0, this.timeEntries.indexOf(this.currentEntry));
    const threeHourIndex = Math.floor(index / 3);
    const humidityIndex = this.findElementIndex('相對濕度');
    const windIndex = this.findElementIndex('風速');
    const rainIndex = this.findElementIndex('降雨機率', '降雨機率6小時', '降雨機率12小時');
    const humidity = this.elementValue(humidityIndex, index, 'RelativeHumidity');
    const wind = this.elementValue(windIndex, threeHourIndex, 'WindSpeed');
    const rain = this.elementValue(rainIndex, threeHourIndex, 'ProbabilityOfPrecipitation') || '--';
    return [
      { label: '相對濕度', value: humidity || '--', unit: '%', icon: '◌', note: '目前時段', progress: Number(humidity) || 0 },
      { label: '風速', value: wind || '--', unit: 'm/s', icon: '〰', note: this.elementValue(windIndex, threeHourIndex, 'BeaufortScale') ? `蒲福級 ${this.elementValue(windIndex, threeHourIndex, 'BeaufortScale')}` : '平均風速', progress: Math.min(100, (Number(wind) || 0) * 5) },
      { label: '降雨機率', value: rain, unit: '%', icon: '⌁', note: '未來時段預測', progress: Number(rain) || 0 },
    ];
  }

  get updatedAt(): string {
    return this.currentEntry?.DataTime ?? '';
  }

  changeLocation(event: Event): void {
    this.selectedLocationIndex = Number((event.target as HTMLSelectElement).value);
    this.selectedDayIndex = 0;
  }

  selectDay(index: number): void {
    this.selectedDayIndex = index;
  }

  private valueAt(time: any, key: string): string {
    const value = time?.ElementValue?.[0]?.[key];
    return value === undefined || value === null || value === '' ? '' : String(value);
  }

  private elementValue(elementIndex: number, timeIndex: number, key: string): string {
    const value = this.selectedLocation?.WeatherElement?.[elementIndex]?.Time?.[timeIndex]?.ElementValue?.[0]?.[key];
    return value === undefined || value === null || value === '' ? '' : String(value);
  }

  private findElementIndex(...names: string[]): number {
    const elements = this.selectedLocation?.WeatherElement ?? [];
    const match = elements.findIndex((element: any) =>
      names.some((name) => String(element.ElementName ?? '').includes(name)),
    );
    if (match >= 0) return match;
    if (names.includes('相對濕度')) return 2;
    if (names.includes('風速')) return 5;
    if (names.includes('天氣現象') || names.includes('天氣')) return 8;
    return -1;
  }

  private weatherValue(key: string): string {
    const index = Math.max(0, this.timeEntries.indexOf(this.currentEntry));
    return this.elementValue(this.findElementIndex('天氣現象', '天氣'), Math.floor(index / 3), key);
  }

  private weatherCode(): string {
    return this.weatherValue('WeatherCode');
  }

  private iconFor(description = '', code = ''): string {
    const condition = `${description} ${code}`;
    if (/雷|thunder|1[5-8]|2[0-4]/i.test(condition)) return '⛈';
    if (/雨|rain|0[8-9]|1[0-4]/i.test(condition)) return '🌧';
    if (/晴|sunny|01|02/i.test(condition)) return '☀️';
    if (/陰|cloudy|07|08/i.test(condition)) return '☁️';
    return '⛅';
  }
}

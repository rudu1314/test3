import { HttpClientService } from './../@services/http-client.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-apitest',
  imports: [],
  templateUrl: './apitest.component.html',
  styleUrl: './apitest.component.scss',
})
export class ApitestComponent {
  arraytest!: any;

  HttpClientService = inject(HttpClientService);

  locationName = '';
  elementName = '';
  dataTime = '';
  dataTime2 = '';
  Temperature = '';
  speed = '';
  weather = '';
  i = 0;
  iconNumber = '';
  icon = '';
  value = '';
  day2 = '';
  day3 = '';
  d = 0;
  d2 = 0;

  //下方為右側表格欄位
  e = 0;
  relativeHumidity = '';
  rightDataTime: any[] = [];
  relativeHumidityData: any[] = [];
  TemperatureData: any[] = [];
  iconNumberData: any[] = [];

  selectedLocation = 0;

  changeLocation(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.selectedLocation = Number(select.value);

    console.log(this.selectedLocation);
    this.updateData(this.i);
  }
  buttonAddTime() {
    if (this.i == 0) {
      this.i = this.d;
      this.updateData(this.i);
    } else if (this.i == this.d) {
      this.i = this.d2;
      this.updateData(this.i);
    } else if (this.i == this.d2) {
      alert('已到達最新資訊');
    }
  }
  buttonDelTime() {
    if (this.i == this.d2) {
      this.i = this.d;
      this.updateData(this.i);
    } else if (this.i == this.d) {
      this.i = 0;
      this.updateData(this.i);
    } else if (this.i == 0) {
      alert('已到達今日資訊');
    }
  }

  checkDay() {
    for (this.d = 0; this.d < 50; this.d++) {
      if (
        this.day2 ==
        this.arraytest.records.Locations[0].Location[
          this.selectedLocation
        ].WeatherElement[0].Time[this.d].DataTime.substring(0, 10)
      ) {
        break;
      }
    }

    for (this.d2 = 0; this.d2 < 50; this.d2++) {
      if (
        this.day3 ==
        this.arraytest.records.Locations[0].Location[
          this.selectedLocation
        ].WeatherElement[0].Time[this.d2].DataTime.substring(0, 10)
      ) {
        break;
      }
    }
  }

  updateData(i: number) {
    const threeHourIndex = Math.floor(i / 3);
    this.day2 = this.arraytest.records.Locations[0].Location[
      this.selectedLocation
    ].WeatherElement[0].Time[30].DataTime.substring(0, 10);
    this.day3 = this.arraytest.records.Locations[0].Location[
      this.selectedLocation
    ].WeatherElement[0].Time[40].DataTime.substring(0, 10);

    this.locationName =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].LocationName;

    

    this.elementName =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[0].ElementName;

    this.dataTime =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[0].Time[i].DataTime;

    this.Temperature =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[0].Time[i].ElementValue[0].Temperature;

    this.speed =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[5].Time[threeHourIndex].ElementValue[0].WindSpeed;
    this.weather =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[8].Time[threeHourIndex].ElementValue[0].Weather;

    this.iconNumber =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[8].Time[threeHourIndex].ElementValue[0].WeatherCode;

    this.value =
      this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[9].Time[
        threeHourIndex
      ].ElementValue[0].WeatherDescription;

    this.dataTime2 = this.arraytest.records.Locations[0].Location[
      this.selectedLocation
    ].WeatherElement[0].Time[i].DataTime.substring(0, 10);

    if (this.iconNumber == '01') {
      this.icon = '☀️';
    } else if (this.iconNumber == '07') {
      this.icon = '☁️';
    } else if (this.iconNumber == '04') {
      this.icon = '⛅';
    }
    //下方為右側表格欄位

    let n = 0;

    this.e = i;
    for (n = 0; n < 6; n++) {
      this.rightDataTime[n] = this.arraytest.records.Locations[0].Location[
        this.selectedLocation
      ].WeatherElement[0].Time[this.e].DataTime.substring(11, 19);

      this.relativeHumidityData[n] =
        this.arraytest.records.Locations[0].Location[
          this.selectedLocation
        ].WeatherElement[2].Time[this.e].ElementValue[0].RelativeHumidity;
      this.TemperatureData[n] =
        this.arraytest.records.Locations[0].Location[
          this.selectedLocation
        ].WeatherElement[0].Time[this.e].ElementValue[0].Temperature;
      this.iconNumberData[n] =
        this.arraytest.records.Locations[0].Location[
          this.selectedLocation
        ].WeatherElement[8].Time[
          Math.floor(this.e / 3)
        ].ElementValue[0].WeatherCode;
      if (this.iconNumberData[n] == '01') {
        this.iconNumberData[n] = '☀️';
      } else if (this.iconNumberData[n] == '07') {
        this.iconNumberData[n] = '☁️';
      } else if (this.iconNumberData[n] == '04') {
        this.iconNumberData[n] = '⛅';
      }

      this.e++;
      console.log(this.e);
    }
  }
  right() {}

  ngOnInit(): void {
    this.HttpClientService.getApi(
      'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-077?Authorization=CWA-281F449D-E680-4A96-9E2C-3103052634EF&format=JSON',
    ).subscribe((res) => {
      console.log(res);
      this.arraytest = res;
      this.updateData(0);
      this.checkDay();
    });
  }
}

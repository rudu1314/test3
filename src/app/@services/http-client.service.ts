import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  httpClient =inject(HttpClient);

  getApi(url:string) {
    return this.httpClient.get(url);
  }

  postApi(url:string,data:any) {
    return this.httpClient.post(url,data);
  }

  putApi(url:string,data:any) {
     return this.httpClient.put(url,data);
  }

  delApi(url:string) {
     return this.httpClient.delete(url);
  }
}

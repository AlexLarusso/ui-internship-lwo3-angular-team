import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  URL = '../assets/server-data/data.json';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<[]>(this.URL);
  }
}

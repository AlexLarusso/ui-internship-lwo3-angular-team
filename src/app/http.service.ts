import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './product';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private URL = '../assets/server-data/data.json';

  constructor(private http: HttpClient) {}

  public getData(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.URL);
  }
}

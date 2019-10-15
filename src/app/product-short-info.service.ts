import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { IProductShortInfo } from './product-short-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductShortInfoService {
  constructor(private httpService: HttpService) { }

  public getShortInfo(): Observable<Array<IProductShortInfo>> {
    return this.httpService
      .getData()
      .pipe(map(data =>
        data.map((item => ({
          title: item.productName,
          imgUrl: item.images[0].url[0],
          price: item.price + ' uah',
        })
      ))));
  }
}
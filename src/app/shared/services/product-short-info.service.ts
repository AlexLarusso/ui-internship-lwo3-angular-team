import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { IProductShortInfo } from '../../interfaces/product-short-info.interface';
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
          productTitle: item.productName,
          imgUrl: item.images[0].url[0],
          productPrice: item.price + ' uah',
          productId: item.id,
        })
      ))));
  }
}

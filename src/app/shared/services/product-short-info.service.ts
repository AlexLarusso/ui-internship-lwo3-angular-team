import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IProductShortInfo } from '../../interfaces/product-short-info.interface';
import { ProductFilterService } from '../services/product-filter.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class ProductShortInfoService {
  public similarProducts = [];
  public similarOptions = {
    sex: '',
    category: '',
    id: 1
  };

  constructor(
    private productFilterService: ProductFilterService,
    private httpService: HttpService,
    private storeService: StoreService
  ) {}

  public getShortInfo(category = 'all'): Observable<Array<IProductShortInfo>> {
    switch (category) {
      case 'all':
        return this.httpService.getData().pipe(
          map(data =>
            data.map(item => ({
              productTitle: item.productName,
              imgUrl: item.images[0].url[0],
              productPrice: item.price + ' uah',
              productId: item.id
            }))
          )
        );
      case 'similar':
        return this.httpService.getData().pipe(
          map(data =>
            this.productFilterService
              .findSimilar(data, this.similarOptions)
              .map(item => ({
                productTitle: item.productName,
                imgUrl: item.images[0].url[0],
                productPrice: item.price + ' uah',
                productId: item.id
              }))
          )
        );
      case 'allrecentItems':
        return this.httpService.getData().pipe(
          map(data =>
            data.filter(el =>
                this.storeService.recentlyViewed.includes(el.id.toString()))
              .map(item => ({
                productTitle: item.productName,
                imgUrl: item.images[0].url[0],
                productPrice: item.price + ' uah',
                productId: item.id
              }))
          )
        );
    }
  }
}

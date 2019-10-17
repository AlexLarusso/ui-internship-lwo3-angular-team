import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { IProductShortInfo } from './product-short-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductShortInfoService {
  public similarProducts = [];
  public similarOptions = {
    sex: "female",
    category: "blouse",
  }

  constructor(private httpService: HttpService) { }

  public getShortInfo(category = 'all'): Observable<Array<IProductShortInfo>> {
    switch(category) {
      case 'all':
      return this.httpService
      .getData()
      .pipe(map(data =>
        data.map((item => ({
          title: item.productName,
          imgUrl: item.images[0].url[0],
          price: item.price.toString(),
          id: item.id,
        })
      ))));
      case 'similar':
         return this.httpService.getData()
          .pipe(map(data => this.findSimilar(data, this.similarOptions).map((item => ({
            title: item.productName,
            imgUrl: item.images[0].url[0],
            price: item.price,
            id: item.id,
          })))));
    }
  }

 public findSimilar(products, similarOptions?): any {
  const similarProd = products.filter((product) =>
   product.category === similarOptions.category &&
   product.sex === similarOptions.sex);

  return similarProd;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from './http.service';
import { IProduct } from 'src/app/interfaces/product.interface';
import { IProductShortInfo } from 'src/app/interfaces/product-short-info.interface';
import { ProductFormat } from 'src/app/app.enum';
import { IProductSimilarOptions } from 'src/app/interfaces/product-similar-options.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) { }

  public getProducts(format: string = ProductFormat.full):
    Observable<Array<any>> {
      console.log(format);
      return this.httpService.getData().pipe(
        map(products => products.map(
          product => this.formatProduct(product, format)
        ))
      );
  }

  public getProductsByCategory(category: string, format: string = ProductFormat.full):
    Observable<Array<any>> {
      return this.httpService.getProductsByCategory(category).pipe(
        map(products => products.map(
          product => this.formatProduct(product, format))
      ));
  }

  public getProductById(id, format: string = ProductFormat.full):
    Observable<any> {
      return this.httpService.getProductById(id).pipe(
        map(product => this.formatProduct(product, format)
      ));
  }

  public getSimilarProducts(similarOptions: IProductSimilarOptions, format: string):
    Observable<Array<any>> {
      return this.httpService.getProductsByCategory(similarOptions.category)
      .pipe(map(data => data.filter(product =>
        product.category === similarOptions.category &&
        product.sex === similarOptions.sex &&
        product.id !== similarOptions.id)),
          map(data => data.map(product =>
            this.formatProduct(product, format))
          )
      );
  }

  public formatProduct(product: IProduct, format: string):
    IProduct | IProductShortInfo {
      switch(format) {
        case ProductFormat.full: return product;
        case ProductFormat.short: return {
            productTitle: product.productName,
            imgUrl: product.images[0].url[0],
            productPrice: product.price + ' uah',
            productId: product.id,
          }
      }
  }
}

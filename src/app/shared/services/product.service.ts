import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { ProductFormat } from 'src/app/app.enum';
import {
  IProduct, IProductShortInfo, IProductSimilarOptions
} from 'src/app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public recentlyViewed: Array<string> = [];
  public storageSubject = new BehaviorSubject([]);

  constructor(private httpService: HttpService) { }

  public getProducts(format: string = ProductFormat.full):
    Observable<Array<any>> {
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

  public getProductById(id: string, format: string = ProductFormat.full):
    Observable<any> {
      return this.httpService.getProductById(id).pipe(
        map(product => this.formatProduct(product, format)
      ));
  }

  public getSimilarProducts(similarOptions: IProductSimilarOptions, format: string):
    Observable<Array<any>> {
      return this.httpService.getProductsByCategory(similarOptions.category)
        .pipe(map(data =>
          this.filterSimilarProducts(data, similarOptions)
            .map(product => this.formatProduct(product, format))
        ));
  }

  public addProductToLocalStorage(id: string): void {
    this.recentlyViewed =
      JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (this.recentlyViewed.indexOf(id) !== -1) {
      this.recentlyViewed.splice(this.recentlyViewed.indexOf(id), 1);
    }
    this.recentlyViewed.unshift(id);
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    this.storageSubject.next(this.recentlyViewed);
  }

  private formatProduct(product: IProduct, format: string):
    IProduct | IProductShortInfo {
      switch (format) {
        case ProductFormat.full: return product;
        case ProductFormat.short: return {
          productTitle: product.productName,
          imgUrl: product.images[0].url[0],
          productPrice: product.price + ' uah',
          productId: product.id,
        };
      }
  }

  private filterSimilarProducts(
    products: Array<IProduct>,
    similarOptions: IProductSimilarOptions): Array<IProduct> {
      return products.filter(product =>
        product.category === similarOptions.category &&
        product.sex === similarOptions.sex &&
        product.id !== similarOptions.id);
  }
}

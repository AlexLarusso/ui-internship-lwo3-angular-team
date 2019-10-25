import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  public recentlyViewed: Array<{}> = [];
  public storageSubject = new BehaviorSubject([]);
  public recentItemOrder = 0;

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

  public getProductsByIds(items: any, format: string = ProductFormat.full):
    Array<Observable<any>>  {
      return items.map(item => this.httpService.getProductById(item.id).pipe(
        map(product => this.formatProduct(product, format)
      )));
  }

  public getSimilarProducts(similarOptions: IProductSimilarOptions, format: string):
    Observable<Array<any>> {
      return this.httpService.getProductsByCategory(similarOptions.category)
        .pipe(map(data =>
          this.filterSimilarProducts(data, similarOptions)
            .map(product => this.formatProduct(product, format))
        ));
  }

  public addProductToLocalStorage({id, order}): void {
    this.recentlyViewed =
      JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (this.recentlyViewed.includes(item => item.id)) {
      this.recentlyViewed.splice(this.recentlyViewed.indexOf({id, order}), 1);
    }
    this.recentlyViewed.unshift({id, order});
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    this.storageSubject.next(this.recentlyViewed);
    console.log(this.storageSubject.value, 'subj');
  }

  public recentProductOrder(id: string) {
    const order = this.recentItemOrder++;
    this.addProductToLocalStorage({id, order});
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

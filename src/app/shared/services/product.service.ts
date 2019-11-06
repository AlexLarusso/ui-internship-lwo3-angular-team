import { Injectable } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { ProductFormat } from 'src/app/app.enum';
import {
  IProduct, IProductSimilarOptions
} from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { getAllProductImages } from 'src/app/store/selectors/products.selectors';
import { URLs } from '../../app.enum';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public recentlyViewed: Array<{}> = [];
  public storageSubject = new BehaviorSubject([]);
  public recentItemOrder = 0;
  public imagesSub: Subscription;
  public allProductImages: Array<any>;

  constructor(
    private httpService: HttpService,
    private store: Store<IAppState>
  ) {
    this.imagesSub = this.store.select(getAllProductImages).subscribe(images => this.allProductImages = images);
  }

  public getProducts(format: string = ProductFormat.full):
  Observable<Array<any>> {
    return this.httpService.getData().pipe(
      tap(data => console.log(data)),
      map(products => products.map(
        product => this.formatProduct(product, format)
      ))
    );
  // Subscription {
    // return (this.store.select(getAllProducts) as Observable<Array<IProduct>>)
    //   .pipe(
    //     map(
    //       products => products.map(product => this.formatProduct(product, format))
    //     ));
  // }
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
      return items.map((item: { id: string; }) => this.httpService.getProductById(item.id).pipe(
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
    this.recentlyViewed.forEach(el => Object.values(el).includes(id)
      ? this.recentlyViewed.splice(this.recentlyViewed.indexOf(el), 1)
      : false);
    this.recentlyViewed.unshift({id, order});
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    this.storageSubject.next(this.recentlyViewed);
  }

  public recentProductOrder(id: string) {
    const order = this.recentItemOrder++;
    this.addProductToLocalStorage({id, order});
  }

  private formatProduct(product: IProduct, format: string):
    any {
      const firsProductImage = this.allProductImages
        .filter(image => image.productId === product._id)[0].claudinaryId;

      switch (format) {
        case ProductFormat.full: {
          const productImages = this.allProductImages
            .filter(image => image.productId === product._id)
            .reduce((prodImages, image) => {
              for (let i = 0; i < prodImages.length; i++) {
                if (prodImages[i].value === image.productColor) {
                  prodImages[i].url.push(`${URLs.productImage}/${image.claudinaryId}`);
                  return prodImages;
                }
              }

              prodImages.push({
                value: image.productColor,
                url: [`${URLs.productImage}/${image.claudinaryId}`]
              });

              return prodImages;
          }, []);

          return { ...product,
            images: [...productImages]
          };
        }

        case ProductFormat.short: return {
          productTitle: product.productName,
          imgUrl: `${URLs.productImage}/${firsProductImage}`,
          productPrice: product.price + ' uah',
          productId: product._id,
          status: product.status,
          gender: product.gender,
          season: product.season
        };
      }
  }

  private filterSimilarProducts(
    products: Array<IProduct>,
    similarOptions: IProductSimilarOptions): Array<IProduct> {
      return products.filter(product =>
        product.category === similarOptions.category &&
        product.gender === similarOptions.gender &&
        product._id !== similarOptions.id);
  }
}

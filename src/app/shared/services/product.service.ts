import { Injectable, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { getCartProductItems } from 'src/app/store/selectors/cart.selector';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { ProductFormat } from 'src/app/app.enum';
import { IProduct, IProductSimilarOptions, IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  public recentlyViewed: Array<{}> = [];
  public storageSubject = new BehaviorSubject([]);
  public recentItemOrder = 0;

  private CART_KEY = 'Cart';

  constructor(
    private httpService: HttpService,
    private store: Store<IAppState>
  ) { }

  public getProducts(format: string = ProductFormat.full):
    Observable<Array<any>> {
      return this.httpService.getAllProducts().pipe(
        map(products => products.map(
          product => this.formatProduct(product, format)
        ))
      );
  }

  public formatProduct(product: IProduct, format: string):
    IProduct | IProductShortInfo {
    switch (format) {
      case ProductFormat.full: {

        return { ...product };
      }

      case ProductFormat.short: {
        const firstProductImage = product.images[0].url[0];
        const {
          productName: productTitle,
          price,
          _id: productId,
          status,
          gender,
          seasons
        } = product;

        return {
          productTitle,
          imgUrl: `${firstProductImage}`,
          productPrice: price + ' USD',
          productId,
          status,
          gender,
          seasons
        };
      }
    }
  }

  public getProductById(id: string, format: string = ProductFormat.full):
    Observable<any> {

    return this.store.select(getAllProducts)
      .pipe(map(products => {
        const searchedProduct = products.find(el => el._id === id);

        return this.formatProduct(searchedProduct, format);
      }));
  }

  public getProductsByIds(items: any, format: string = ProductFormat.full):
    Array<Observable<any>>  {
      return items.map((item: { id: string; }) => this.httpService.getProductById(item.id).pipe(
        map(product => this.formatProduct(product, format)
      )));
  }

  public getSimilarProducts(similarOptions: IProductSimilarOptions, format: string):
    Observable<Array<any>> {
      return this.getProductsByCategory(similarOptions.category)
        .pipe(map(data =>
          this.filterSimilarProducts(data, similarOptions)
            .map(product => this.formatProduct(product, format))
        ));
  }

  public addProductToLocalStorage({id, order}): void {
    this.recentlyViewed =
      JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    this.recentlyViewed.forEach(el => Object.values(el).includes(id) ?
      this.recentlyViewed.splice(this.recentlyViewed.indexOf(el), 1) :
      false);

    this.recentlyViewed.unshift({id, order});

    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));

    this.storageSubject.next(this.recentlyViewed);
  }

  public recentProductOrder(id: string): void {
    const order = this.recentItemOrder++;

    this.addProductToLocalStorage({id, order});
  }

  public setCartItemsToLocalStorage(): void {
    this.store.select(getCartProductItems)
    .subscribe(products =>
      localStorage.setItem(this.CART_KEY, JSON.stringify(products))
      );
    }

  public ngOnDestroy(): void { }

  private getProductsByCategory(category: string, format: string = ProductFormat.full):
  Observable<Array<any>> {
    return this.store.select(getAllProducts)
      .pipe(map(
        products => products
        .filter(
          product => product.category === category)
        .map(
          product => this.formatProduct(product, format))
      ));
  }

  private filterSimilarProducts(products: Array<IProduct>, similarOptions: IProductSimilarOptions):
    Array<IProduct> {
      return products.filter(product =>
        product.category === similarOptions.category &&
        product.gender === similarOptions.gender &&
        product._id !== similarOptions.id);
  }
}

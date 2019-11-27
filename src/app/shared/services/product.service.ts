import { Injectable, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';
import { getCartProductItems } from 'src/app/store/selectors/cart.selector';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { ProductFormat, URLs } from 'src/app/app.enum';
import { IProduct, IProductSimilarOptions, IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  public recentlyViewed: Array<{}> = [];
  public storageSubject = new BehaviorSubject([]);
  public recentItemOrder = 0;
  public localStorageSub: Subscription;

  private CART_KEY = 'Cart';

  constructor(
    private readonly httpService: HttpService,
    private readonly store: Store<IAppState>
  ) { }

  public setCartItemsToLocalStorage(): void {
    this.localStorageSub = this.store.select(getCartProductItems)
      .subscribe(products =>
        localStorage.setItem(this.CART_KEY, JSON.stringify(products))
        );
  }

  public formatProduct(product: any, format: string):
    IProduct | IProductShortInfo {
    switch (format) {
      case ProductFormat.full: {
        const productImages = product.images
          .reduce((prodImages, image) => {
            const isColorAlreadyExist = prodImages.some(el => el.value === image.productColor);

            if (isColorAlreadyExist) {
              prodImages.forEach(el => {
                if (el.value === image.productColor) {
                  el.url.push(`${URLs.productImage}/${image.claudinaryId}`);
                }
              });
            } else {
              prodImages.push({
                value: image.productColor,
                url: [`${URLs.productImage}/${image.claudinaryId}`]
              });
            }

            return prodImages;
        }, []);
        const formattedProduct = product.video
          ? { ...product, images: [...productImages], video: URLs.productVideo + product.video }
          : { ...product, images: [...productImages] };

        return formattedProduct;
      }

      case ProductFormat.short: {
        const firstProductImage = product.images[0].url[0];
        const secondProductImage = product.images[0].url[1];

        return {
          productTitle: product.productName,
          imgUrl: firstProductImage,
          imgUrlNext: secondProductImage,
          productPrice: `${product.price} USD`,
          productId: product._id,
          status: product.status,
          gender: product.gender,
          seasons: product.seasons,
          brand: product.brand,
          category: product.category,
        };
      }
    }
  }

  public getProductById(id: string, format: string = ProductFormat.full):
    Observable<IProduct | IProductShortInfo> {
      return this.httpService.getProductById(id)
        .pipe(map(product => this.formatProduct(product, format)
      ));
  }

  public getProductsByIds(items: any, format: string = ProductFormat.full):
    Array<Observable<IProductShortInfo>>  {

      return items.map((item: { id: string }) =>
        this.httpService.getProductById(item.id)
          .pipe(map(el => {
            const full = this.formatProduct(el, ProductFormat.full);

            return this.formatProduct(full, format);
          })));
  }

  public getSimilarProducts(similarOptions: IProductSimilarOptions, format: string):
    Observable<Array<IProduct | IProductShortInfo>>  {
      return this.getProductsByCategory(similarOptions.category)
        .pipe(map(data =>
          this.filterSimilarProducts(data, similarOptions)
            .map(product => this.formatProduct(product, format))
        ));
  }

  public addProductToLocalStorage(id): void {
    this.recentlyViewed =
      JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    this.recentlyViewed.forEach(el => Object.values(el).includes(id) ?
      this.recentlyViewed.splice(this.recentlyViewed.indexOf(el), 1) :
      false);

    this.recentlyViewed.unshift({id, order: this.recentItemOrder});

    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));

    this.storageSubject.next(this.recentlyViewed);
  }

  public recentProductOrder(id: string): void {
    this.recentItemOrder++;

    this.addProductToLocalStorage(id);
  }

  public randomSortProducts(products) {
    return products.sort(() => Math.random() - 0.5);
  }

  public ngOnDestroy(): void { }

  private getProductsByCategory(category: string):
  Observable<Array<IProduct>> {
    return this.store.select(getAllProducts)
      .pipe(map(
        products => products
          .filter(
            product => product.category === category)
          ));
  }

  private filterSimilarProducts(products: Array<IProduct>, similarOptions: IProductSimilarOptions):
    Array<IProduct> {
      return products
        .filter(product =>
          product.category === similarOptions.category &&
          product.gender === similarOptions.gender &&
          product._id !== similarOptions.id);
  }
}

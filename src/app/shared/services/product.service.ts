import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from './http.service';
import { IProduct } from 'src/app/interfaces/product.interface';
import { IProductShortInfo } from 'src/app/interfaces/product-short-info.interface';
import { ProductFormat } from 'src/app/app.enum';
import { ProductDetailsPageModule } from 'src/app/pages/product-details-page/product-details-page.module';

@Injectable({
  providedIn: ProductDetailsPageModule
})
export class ProductService {
  constructor(private httpService: HttpService) { }

  public getProducts(format: string = ProductFormat.full):
    Observable<Array<IProduct>> | Observable<Array<IProductShortInfo>> {
      console.log(format);
      
      return this.httpService.getData().pipe(
        map(products => products.map(
          product => this.formatProduct(product, format)
        ))
      );
  }

  public getProductsByCategory(category: string, format: string = ProductFormat.full):
    Observable<Array<IProduct>> | Observer<Array<IProductShortInfo>> {
      return this.httpService.getProductsByCategory(category).pipe(
        map(products => products.map(
          product => this.formatProduct(product, format)
        )));
  }

  public getProductById(id, format: string = ProductFormat.full):
    Observable<IProduct> | Observable<IProductShortInfo> {
      console.log(id, format);
      
      return this.httpService.getProductById(id).pipe(
        map(product => this.formatProduct(product, format))
      );
  }

  public formatProduct(product: IProduct, format: string):
    IProduct | IProductShortInfo {
      switch(format) {
        case ProductFormat.full: { return product; }
        case ProductFormat.short: {
          return {
            productTitle: product.productName,
            imgUrl: product.images[0].url[0],
            productPrice: product.price + ' uah',
            productId: product.id,
          }
        }
      }
  }
}

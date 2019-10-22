import { Injectable } from '@angular/core';

import { IProductSimilarOptions } from '/src/app/interfaces/product-similar-options.interface';
import { IProductService } from './product.service.ts';

@Injectable({
  providedIn: 'root'
})

export class ProductFilterService {

  constructor(private productService: ProductService) { }

  public findSimilar(similarOptions: IProductSimilarOptions, format: string): any {
    const products = this.productService.getProducts();

    const similarProd = products.filter((product) =>
     product.category === similarOptions.category &&
     product.sex === similarOptions.sex &&
     product.id !== similarOptions.id);

    return this.productService.formatProduct(similarProd, format);
    }
}

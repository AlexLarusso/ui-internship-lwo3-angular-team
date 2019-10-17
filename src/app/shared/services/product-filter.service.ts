import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductFilterService {
  public findSimilar(products, similarOptions?): any {
    const similarProd = products.filter((product) =>
     product.category === similarOptions.category &&
     product.sex === similarOptions.sex &&
     product.id !== similarOptions.id);

    return similarProd;
    }
}
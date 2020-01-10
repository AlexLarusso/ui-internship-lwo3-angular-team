import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAppState } from '../../app.store';
import {
  getSearchByNameResult,
  getAllProducts,
  getFilteredProducts
} from './products.selector';

import {
  SearchByProductName,
  SetFilterCriteria,
  SetProducts,
  LoadProducts
} from './products.action';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/shared/services/http.service';
import { IProduct } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {
  public searchByProductName$ = this.store.select(getSearchByNameResult);
  public products$ = this.store.select(getAllProducts);
  public filteredProducts$ = this.store.select(getFilteredProducts);

  constructor(
    private store: Store<IAppState>,
    private httpService: HttpService) { }

  public onSearchByProductName(payload): void {
    this.store.dispatch(new SearchByProductName(payload));
  }

  public onSetFilterCriteria(payload): void {
    this.store.dispatch(new SetFilterCriteria(payload));
  }

  public loadProducts(): void {
    this.store.dispatch(new LoadProducts());
  }

  public onSetProducts(): any {
    return this.httpService.getAllProducts()
      .pipe(
        map(products => new SetProducts(products))
      );
  }

  public getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this.products$
      .pipe(
        map(products => products.filter(product => product.category === category)
        ));
    }
}

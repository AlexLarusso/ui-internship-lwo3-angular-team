import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { SearchByProductName } from 'src/app/store/actions/products.action';

import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { getSearchByNameResult } from '../../store/selectors/products.selectors';

import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from 'src/app/shared/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', {static: true}) searchBox: ElementRef;
  @ViewChild('searchWrapper', {static: true}) searchWrapper: ElementRef;

  public products$: Observable<Array<IProduct>>;

  constructor(
    private readonly store: Store<IAppState>,
    private readonly productService: ProductService,
  ) { }

  public ngOnInit(): void {
    this.products$ = this.store.select(getSearchByNameResult)
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      );

    fromEvent(document, 'click')
    .subscribe(el => {
      !this.searchWrapper.nativeElement.contains(el.target) ?
        this.searchBox.nativeElement.value = '' :
        false;
    });
  }

  public ngOnDestroy(): void { }

  public search(term: string): void {
    this.store.dispatch(new SearchByProductName(term));
  }

  public addIdToLocalStorage(id: string): void {
    this.productService.recentProductOrder(id);
  }

}


import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { IProduct } from '../../interfaces/product.interface';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', {static: true}) searchBox: ElementRef;
  @ViewChild('searchWrapper', {static: true}) searchWrapper: ElementRef;

  public products$: Observable<Array<IProduct>>;
  public onBlurSub: Subscription;
  public searchValue: string;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.products$ = this.productsFacade.searchByProductName$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      );

    this.onBlurSub = fromEvent(document, 'click')
      .subscribe(el => {
        if (!this.searchWrapper.nativeElement.contains(el.target)) {
          this.searchValue = '';
        }
        this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void { }

  public search(): void {
    this.productsFacade.onSearchByProductName(this.searchValue);
  }
}


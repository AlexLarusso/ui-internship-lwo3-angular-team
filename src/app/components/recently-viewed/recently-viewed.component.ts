import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription, forkJoin} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IProductShortInfo } from 'src/app/interfaces';
import { LocalStorageService } from '../../shared/services/web-storage/local-storage.service';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss'],
})
export class RecentlyViewedComponent implements OnInit, OnDestroy {
  public recentlyViewedProducts: Array<IProductShortInfo> = [];
  public recentProductsSub: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    ) { }

  public ngOnInit(): void {
    this.checkIfExpired();

    this.productService.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));

    if (this.productService.recentlyViewed) {
      this.productService.storageSubject.next(this.productService.recentlyViewed);
    }

    this.recentProductsSub = this.productService.storageSubject
      .pipe(
        switchMap(ids => {
          return forkJoin(this.productService.getProductsByIds(ids, ProductFormat.short));
        })
      )
      .subscribe(products =>
        this.recentlyViewedProducts = products.sort((prev, next) => next.order - prev.order));
  }

  public ngOnDestroy(): void { }

  private checkIfExpired(): void {
    const hours = 0.1; // 360 seconds
    const now = new Date().getTime();
    const hoursToMiliseconds = hours * 60 * 60 * 1000;
    const TimerForRecentItemsExpiry = JSON.parse(localStorage.getItem('clearRecentlyViewed'));
    const recentlyViewExists = JSON.parse(localStorage.getItem('recentlyViewed'));
    const timeDifference = now - TimerForRecentItemsExpiry;

    if (TimerForRecentItemsExpiry == null && recentlyViewExists) {
      localStorage.setItem('clearRecentlyViewed', JSON.stringify(now));
    } else if (timeDifference > hoursToMiliseconds) {
      this.localStorageService.localStorageDelete('recentlyViewed');

      this.localStorageService.localStorageDelete('clearRecentlyViewed');
    }
  }
}

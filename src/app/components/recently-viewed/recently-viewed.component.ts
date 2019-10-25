import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../shared/services/web-storage/local-storage.service';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { Subscription } from 'rxjs';
import { map, concatAll, takeWhile, concatMap} from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})
export class RecentlyViewedComponent implements OnInit, OnDestroy {
  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    ) {}

  public recentlyViewedProducts: Array<IProductShortInfo> = [];
  public recentProductsSub: Subscription;

  public ngOnInit(): void {
    this.checkIfExpired();

    this.productService.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));

    if (this.productService.recentlyViewed) {
      this.productService.storageSubject.next(this.productService.recentlyViewed);
    }

    this.recentProductsSub = this.productService.storageSubject
      .pipe(
        takeWhile((data) => Boolean(data.length)),
        concatMap(ids => ids),
        map(productId => this.productService.getProductById(productId, ProductFormat.short)),
        concatAll()
      )
      .subscribe(el => {
      this.recentlyViewedProducts.push(el);
      });
}

  public checkIfExpired(): void {
    const hours = 0.1; // 360 seconds
    const now = new Date().getTime();
    const hoursToMiliseconds = hours * 60 * 60 * 1000;
    const TimerForRecentItemsExpiry = JSON.parse(localStorage.getItem('clearRecentlyViewed'));
    const recentlyViewExists = JSON.parse(localStorage.getItem('recentlyViewed'));
    const timeDifference = now - TimerForRecentItemsExpiry;

    if (TimerForRecentItemsExpiry == null && recentlyViewExists) {
      localStorage.setItem('clearRecentlyViewed', JSON.stringify(now));
    } else {
      if (timeDifference > hoursToMiliseconds) {
        this.localStorageService.localStorageDelete('recentlyViewed');
        this.localStorageService.localStorageDelete('clearRecentlyViewed');
      }
    }
  }

  public ngOnDestroy() { }
}

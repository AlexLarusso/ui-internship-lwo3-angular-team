import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { StoreService } from '../../shared/services/store.service';
import { IProductShortInfo } from '../../interfaces'
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})
export class RecentlyViewedComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private storeService: StoreService,
    private productService: ProductService
    ) {}

  public products = 'allrecentItems';
  public isEmpty: boolean;
  public recentlyViewedProducts: Array<IProductShortInfo> = [];

  public ngOnInit(): void {
    this.checkIfExpired();
    this.storeService.init();
    this.storeService.storageSub.getValue().map(id => {
      this.productService.getProductById(id, ProductFormat.short).subscribe(
        product => this.recentlyViewedProducts.push(product)
      )
    })
  }

  public checkIfExpired() {
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
}

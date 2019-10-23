import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { StoreService } from '../../shared/services/store.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})
export class RecentlyViewedComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private storeService: StoreService
    ) {}

  public products = 'allrecentItems';
  public isEmpty: boolean;
  // public recentlyViewedProducts: Array<IProduct>;

  public ngOnInit(): void {
    this.checkIfExpired();
    this.storeService.init();
    this.isEmpty = Boolean(this.storeService.recentlyViewed);
    this.storeService.storageSub.asObservable().subscribe((data) => console.log(data));
  }

  public checkIfExpired() {
    const hours = 0.01; // 36 seconds
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

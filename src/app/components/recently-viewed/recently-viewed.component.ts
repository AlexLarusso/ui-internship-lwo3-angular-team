import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/services/web-storage/local-storage.service';
import { StoreService } from '../../shared/services/store.service';
import { IProductShortInfo } from '../../interfaces'
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { getRecentItemsStatus } from 'src/app/store/selectors/recently-viewed.selectors';
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store/app.store';
import { GetRecentProducts } from 'src/app/store/actions/recently-viewed.actions';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})
export class RecentlyViewedComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private storeService: StoreService,
    private productService: ProductService,
    private store: Store<IAppState>
    ) {}

  public products = 'allrecentItems';
  public isEmpty: boolean;
  public recentlyViewedProducts: Array<IProductShortInfo> = [];

  public ngOnInit(): void {
    this.checkIfExpired();
    this.storeService.init();

    // this.store.select(getRecentItemsStatus).subscribe(data => console.log(data))
    this.storeService.storageSubject.getValue().map(id => {
      this.productService.getProductById(id, ProductFormat.short).subscribe(
        product => this.recentlyViewedProducts.push(product)
      )
    })
    // this.store.select(getRecentItemsStatus).subscribe(data => data.map(id => {
    //   this.productService.getProductById(id, ProductFormat.short).subscribe(
    //     product => this.recentlyViewedProducts.push(product)
    //   )
    // }))
    // this.store.dispatch(new GetRecentProducts())

    // New way
  //   this.store.select(getRecentItemsStatus).subscribe(data => {
  //     const subs = [];
  //     data.map(el => subs.push(this.productService.getProductById(el.toString(), ProductFormat.short)))
  //     forkJoin(...subs).subscribe((data) => { console.log(data)
  //       this.recentlyViewedProducts = data;
  //   })
  // })

    // console.log(this.storeService.storageSub.getValue())

    // this.storeService.storageSub.subscribe((data) => {
    //   console.log(data, 'safadsfdafsd')
    // })
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

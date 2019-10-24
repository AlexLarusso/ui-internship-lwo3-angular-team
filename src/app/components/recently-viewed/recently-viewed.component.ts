import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../shared/services/web-storage/local-storage.service';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { Subscription } from 'rxjs';
import { flatMap, map, tap, concatAll, takeWhile} from 'rxjs/operators';

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

  public products = 'allrecentItems';
  public isEmpty: boolean;
  public recentlyViewedProducts: Array<any> = [];
  public test: Subscription;

  public ngOnInit(): void {
    this.checkIfExpired();

    this.productService.recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));

    if (this.productService.recentlyViewed) {
      this.productService.storageSubject.next(this.productService.recentlyViewed);
    }
    // this.store.select(getRecentItemsStatus).subscribe(data => console.log(data))
    // this.productService.storageSubject.getValue().map(id => {
    //   console.log(id, 'subj id')
    //   this.productService.getProductById(id, ProductFormat.short).subscribe(
    //     product => this.recentlyViewedProducts.push(product)
    //   )
    // })
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
  // map(data => this.recentlyViewedProducts.push(data))
    // map(product => {
    //   this.recentlyViewedProducts.push(product)
    //   console.log(product)  
    // }))
     //   this.productService.storageSubject.subscribe((data) => {
  //     data.map(id => {
  //       this.productService.getProductById(id, ProductFormat.short).subscribe(
  //         product => this.recentlyViewedProducts.push(product)
  //     )
  //   })
  // })
this.test = this.productService.storageSubject
    .pipe(
      tap(data => console.log(data, 'event added')),
      takeWhile((data) => Boolean(data.length)),
      flatMap(ids => ids),
      map(productId => this.productService.getProductById(productId, ProductFormat.short)),
      concatAll()
    )
    .subscribe(el => {
      console.log(el)
      this.recentlyViewedProducts.push(el);
    });
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

  public ngOnDestroy() {
    this.test.unsubscribe()
  }
}

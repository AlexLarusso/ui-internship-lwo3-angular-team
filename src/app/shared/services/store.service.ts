import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StoreService {
  public recentlyViewed: Array<string>;
  public storageSub = new Subject();

  public saveViewedHistory(id: string): void {
    this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    this.recentlyViewed.unshift(id);
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    this.storageSub.next(this.recentlyViewed);
  }

  public init() {
    this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));

    if (this.recentlyViewed) {
      this.storageSub.next(this.recentlyViewed);
    }
  }
}

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getRecentItemsStatus } from "../../store/selectors/recently-viewed.selectors";
import { GetRecentProducts } from "../../store/actions/recently-viewed.actions";

import { BehaviorSubject } from "rxjs";
import { IAppState } from "src/app/store/app.store";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(private store: Store<IAppState>) {}

  public recentlyViewed: Array<string>;
  public storageSubject = new BehaviorSubject([]);

  public saveViewedHistory(id: string): void {
    // this.store.dispatch(new GetRecentProducts())
    // this.store
    //   .select(getRecentItemsStatus)
    //   .subscribe(data => console.log(data));

    this.recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    if (this.recentlyViewed.indexOf(id) !== -1) {
      this.recentlyViewed.splice(this.recentlyViewed.indexOf(id), 1);
    }
    this.recentlyViewed.unshift(id);

    localStorage.setItem("recentlyViewed", JSON.stringify(this.recentlyViewed));

    this.storageSubject.next(this.recentlyViewed);
  }

  public init() {
    this.recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));
    // debugger
    if (this.recentlyViewed) {
      this.storageSubject.next(this.recentlyViewed);
    }
  }
}

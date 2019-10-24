import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  public recentlyViewed: Array<string>;
  public storageSubject = new BehaviorSubject([]);

  public addProductToLocalStorage(id: string): void {
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
    if (this.recentlyViewed) {
      this.storageSubject.next(this.recentlyViewed);
    }
  }
}

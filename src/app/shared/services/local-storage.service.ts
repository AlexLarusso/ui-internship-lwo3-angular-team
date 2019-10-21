import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  // TODO: move it from here
  public recentlyViewed: Array<Number>;
  public userEmail = '';
  public ViewedItems = '';
  private storageSub = new BehaviorSubject<any>([]);

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  saveViewedHistory(key: number, data: any) {
    this.recentlyViewed = JSON.parse(localStorage.getItem("recentlyView")) || [];
    this.recentlyViewed.push(key);
    localStorage.setItem("recentlyView", JSON.stringify(this.recentlyViewed));
    this.storageSub.next(this.recentlyViewed);
  }

  public get email() {
    return this.userEmail;
  }

  public setEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  public getItem(property: string): any {
    return localStorage.getItem(property);
  }

  public localStorageAdd(item: string) {
    localStorage.setItem(item, this.userEmail);
  }

  public localStorageDelete(item: string) {
    localStorage.removeItem(item);
  }
}

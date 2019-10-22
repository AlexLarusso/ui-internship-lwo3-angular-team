import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor() {
      this.init();
  }
  // TODO: move it from here
  public recentlyViewed: Array<string>;
  public userEmail = '';
  public ViewedItems = '';
  private storageSub = new BehaviorSubject<any>([]);

  saveViewedHistory(id: string) {
    this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyView')) || [];
    this.recentlyViewed.unshift(id);
    localStorage.setItem('recentlyView', JSON.stringify(this.recentlyViewed));
    this.storageSub.next(this.recentlyViewed);
  }

  public init() {
    this.recentlyViewed = this.getItem('recentlyView');

    if (this.recentlyViewed) {
      this.storageSub.next(this.recentlyViewed);
    }
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

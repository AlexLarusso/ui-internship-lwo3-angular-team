import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  //TODO: move it from here
  public subscribed = false;
  public userEmail = '';

  public onRefresh(item: string) {
    if (localStorage.getItem(item) !== null) {
     return this.subscribed = true;
    }
  }

  public localStorageAdd(item: string) {
    localStorage.setItem(item, this.userEmail);

    return this.subscribed = true;
  };

  public localStorageDelete(item: string) {
    localStorage.removeItem(item);

    return this.subscribed = false;
  };

}

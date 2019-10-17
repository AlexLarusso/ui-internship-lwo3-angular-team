import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  // TODO: move it from here
  public userEmail = '';
  public ViewedItems = '';
  private storageSub= new Subject<boolean>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  saveViewedHistory(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next();
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

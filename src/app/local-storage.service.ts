import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  //TODO: move it from here
  public userEmail = '';

  public get email() {
    return this.userEmail;
  }

  public setEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  public clearEmail(): void {
    this.userEmail = '';
  }

  public getItem(property: string): any {
    return localStorage.getItem(property)
  }

  public localStorageAdd(item: string) {
    localStorage.setItem(item, this.userEmail);
  };

  public localStorageDelete(item: string) {
    localStorage.removeItem(item);
  };

}

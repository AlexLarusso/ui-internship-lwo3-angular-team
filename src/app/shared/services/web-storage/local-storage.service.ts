import { Injectable } from '@angular/core';
import { WebStorageService } from './web-storage.service';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService extends WebStorageService {

  public getData(): void {
    super.getValue();
  }

  public setData(value: string): void {
    super.setValue(value);
  }

  public getItem(property: string): any {
    return localStorage.getItem(property);
  }

  public localStorageAdd(key: string): void {
    localStorage.setItem(key, this.value);
  }

  public localStorageDelete(key: string): void {
    localStorage.removeItem(key);
  }
}

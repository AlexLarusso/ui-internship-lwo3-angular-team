import { Injectable } from '@angular/core';
import { WebStorageService } from './web-storage.service';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService extends WebStorageService {

  public getData(key: string) {
    super.getValue(key);
  }

  public setData(key: string, value: string): void {
    super.setValue(key, value);
  }

  public getItem(property: string): any {
    return localStorage.getItem(property);
  }

  public localStorageAdd(key: string, value?: string): void {
    localStorage.setItem(key, this.value || value);
  }

  public localStorageDelete(key: string): void {
    localStorage.removeItem(key);
  }
}

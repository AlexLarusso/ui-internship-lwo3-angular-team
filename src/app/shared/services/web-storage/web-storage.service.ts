import { Injectable } from '@angular/core';

import { WebStorageFacade } from 'src/app/store/web-storage/web-storage.facade';

@Injectable({
  providedIn: 'root'
})

export class WebStorageService {
  public value: string;

  constructor(public webStorageFacade: WebStorageFacade) { }

  public setValue(key: string, value: string): void {
    this.webStorageFacade.setValue(key, value);

    this.webStorageFacade.storageStatus$
      .subscribe(data => this.value = (data[key]));
  }

  public getValue(key: string): string {
    this.webStorageFacade.getValue(key, this.value);

    this.webStorageFacade.storageStatus$
      .subscribe(data => this.value = JSON.parse(data[key]));

    return this.value;
  }
}

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.store';
import { SetValueToStorage, GetValueFromStorage } from '../../store/web-storage/web-storage.actions';
import { getStorageStatus } from 'src/app/store/web-storage/web-storage.selectors';

@Injectable({
  providedIn: 'root'
})

export class WebStorageFacade {
  public storageStatus$ = this.store.select(getStorageStatus);

  constructor(private store: Store<IAppState>) { }

  public setValue(key: string, value: string): void {
    this.store.dispatch(new SetValueToStorage(key, value));
  }

  public getValue(key: string, value: string): void {
    this.store.dispatch(new GetValueFromStorage(key, value));
  }
}

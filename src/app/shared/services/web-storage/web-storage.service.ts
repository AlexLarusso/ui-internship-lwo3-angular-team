import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { SetValueToStorage, GetValueFromStorage } from '../../../store/actions/web-storage.actions';
import { getStorageStatus } from 'src/app/store/selectors/web-storage.selectors';

@Injectable({
  providedIn: 'root'
})

export class WebStorageService {
  constructor(private store: Store<IAppState>) { }
  public value: string;

  public setValue(key: string, value: string): void {
    this.store.dispatch(new SetValueToStorage(key, value));
    this.store.select(getStorageStatus)
      .subscribe(data => this.value = (data[key]));
  }

  public getValue(key: string): string {
    this.store.dispatch(new GetValueFromStorage(key, this.value));
    this.store.select(getStorageStatus)
      .subscribe(data => this.value = JSON.parse(data[key]));

    return this.value;
  }
}

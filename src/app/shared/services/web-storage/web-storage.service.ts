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

  public setValue(value: string): void {
    this.store.dispatch(new SetValueToStorage(value));
    this.store.select(getStorageStatus)
      .subscribe(data => this.value = JSON.stringify(data));
  }

  public getValue(): string {
    this.store.dispatch(new GetValueFromStorage(this.value));
    this.store.select(getStorageStatus)
    .subscribe(data => this.value = JSON.parse(data));

    return this.value;
  }
}

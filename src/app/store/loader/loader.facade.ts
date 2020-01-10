import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/app.store';
import { getLoadingStatus } from './loader.selector';
import { LoaderShow, LoaderHide } from './loader.actions';

@Injectable({
  providedIn: 'root'
})
export class LoaderFacade {
  loader$ = this.store.select(getLoadingStatus);

  constructor(private store: Store<IAppState>) { }

  public showLoader(): void {
    this.store.dispatch(new LoaderShow());
  }

  public hideLoader(): void {
    this.store.dispatch(new LoaderHide());
  }
}

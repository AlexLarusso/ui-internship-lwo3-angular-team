import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

import { LoaderShow, LoaderHide } from 'src/app/store/actions/loader.actions';
import { IAppState } from 'src/app/store/app.store';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new LoaderShow());

    return next.handle(req).pipe(delay(700),
        finalize(() =>
          this.store.dispatch(new LoaderHide())
        )
      );
  }
}

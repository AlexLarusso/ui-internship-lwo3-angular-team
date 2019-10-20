import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import * as loaderActions  from 'src/app/store/actions/loader.actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new loaderActions.LoaderShow());

    return next.handle(req).pipe(delay(1000),
        finalize(() =>
          this.store.dispatch(new loaderActions.LoaderHide())
        )
      );
  }
}

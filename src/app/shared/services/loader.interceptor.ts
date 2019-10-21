import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { LoaderShow, LoaderHide } from 'src/app/store/actions/loader.actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new LoaderShow());

    return next.handle(req).pipe(delay(1000),
        finalize(() =>
          this.store.dispatch(new LoaderHide())
        )
      );
  }
}

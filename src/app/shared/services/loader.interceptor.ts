import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

import { LoaderFacade } from 'src/app/store/loader/loader.facade';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderFacade: LoaderFacade) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderFacade.showLoader();

    return next.handle(req).pipe(delay(700),
        finalize(() =>
          this.loaderFacade.hideLoader()
        )
      );
  }
}

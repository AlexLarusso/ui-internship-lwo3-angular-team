import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: rewrite in an apropriate way
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => setTimeout(() => {
        this.loaderService.hide();
        }, 2000)));

    // next.handle(req)
    // .pipe(
    //   map(() => this.loaderService.show()),
    //     delay(2000))
    //   .subscribe(event => this.loaderService.hide());
  }
}

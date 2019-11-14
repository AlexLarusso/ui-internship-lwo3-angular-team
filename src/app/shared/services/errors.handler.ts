import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  public handleError(error: Error | HttpErrorResponse): void {
    const toastrService = this.injector.get(ToastrService);
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        toastrService.info('No internet connection!');
      } else {
        toastrService.error('Error');
      }
    } else {
      toastrService.error(`An internal error ${error.name}`, error.message);
      router.navigate(['/error']);
    }
  }
}

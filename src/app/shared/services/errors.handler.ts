import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { ToastrMessage } from 'src/app/app.enum';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  public handleError(error: Error | HttpErrorResponse): void {
    const toastrService = this.injector.get(ToastrService);
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        toastrService.info(ToastrMessage.internetError);
      } else {
        toastrService.error(ToastrMessage.error);
      }
    } else {
      toastrService.error(`${ToastrMessage.internalError} ${error.name}`, error.message);
      router.navigate(['/error']);
    }
  }
}

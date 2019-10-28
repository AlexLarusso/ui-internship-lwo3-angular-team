import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './notification.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  public handleError(error: Error | HttpErrorResponse): void {
    const notificationService = this.injector.get(NotificationService);
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        notificationService.warning('No internet connection!');
      } else {
        notificationService.error(`HTTP error: ${error.status}`, error.message);
      }
    } else {
      router.navigate(['/error'], { queryParams: { error } });
    }
  }
}

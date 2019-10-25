import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {

  handleError(error: Error) {
    console.log(`Error happened: ${error}`);
  }
}

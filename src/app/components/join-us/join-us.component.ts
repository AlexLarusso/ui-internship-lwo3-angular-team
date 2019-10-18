import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.html',
  styleUrls: ['./join-us.scss']
})

export class JoinUsComponent implements OnInit {
  public subscribed = false; // TODO: You have already isSubscribed
  public buttonDisabled = true;
  public emailValid = false; // TODO: please name it properly, isEmailValid. Check everewhere in app
  public invalid = false; // TODO: Same... you have emailValid already.. Or isInvalid or remove
  public isSubscribed = false; 
  public inputText = '';
  public formText = {
    success: 'You have successfully subscribed to our newsletter',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
    message: 'Subscribe to Newsletter:'
  };
  // TODO: Move this regexp to typescript ENUMs
  private emailRegEx = /^(?=^.{6,25}$)(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,4}$/;

  constructor(private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.onRefresh('userEmail');
  }

  public onBlur(): void {
    this.invalid = false;
  }

  public onRefresh(item: string) { // TODO: add void
    if (this.localStorageService.getItem(item) !== null) {
     return this.isSubscribed = true; // TODO: You don't need to return value
    }
  }

  public saveUser(): void {
    this.localStorageService.setEmail(this.inputText);
    this.localStorageService.localStorageAdd('userEmail');
    this.isSubscribed = true;
  }

  public deleteUser(): void {
    this.localStorageService.localStorageDelete('userEmail');
    this.isSubscribed = false;
  }

  public onValidate(value?: string): void {
    const isValid = this.emailRegEx.test(value || this.inputText); // TODO: empty line after
    this.localStorageService.setEmail(this.inputText);
    this.buttonDisabled = !isValid;
    this.invalid = !isValid;
    }
}

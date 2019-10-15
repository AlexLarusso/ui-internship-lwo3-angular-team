import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.html',
  styleUrls: ['./join-us.scss']
})

export class JoinUs implements OnInit {
  public subscribed = false;
  public buttonDisabled = true;
  public emailValid = false;
  public invalid = false;
  public isSubscribed = false;
  public inputText = '';
  public formText = {
    success: 'You have successfully subscribed to our newsletter',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
    message: 'Subscribe to Newsletter:'
  };
  private emailRegEx = /^(?=^.{6,25}$)(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,4}$/;

  constructor(private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.onRefresh('userEmail');
  }

  public onBlur(): void {
    this.invalid = false;
  }

  public onRefresh(item: string) {
    if (this.localStorageService.getItem(item) !== null) {
     return this.isSubscribed = true;
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
    const isValid = this.emailRegEx.test(value || this.inputText);
    this.localStorageService.setEmail(this.inputText);    
    this.buttonDisabled = !isValid;
    this.invalid = !isValid;
    };
}

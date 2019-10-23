import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../shared/services/web-storage/local-storage.service';
import { EnumRegExp } from '../../app.enum';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.html',
  styleUrls: ['./join-us.scss']
})

export class JoinUsComponent implements OnInit {
  public buttonDisabled = true;
  public isEmailValid = false;
  public isInvalid = false;
  public isSubscribed = false;
  public inputText = '';
  public formText = {
    success: 'You have successfully subscribed to our newsletter',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
    message: 'Subscribe to Newsletter:'
  };
  private emailRegExp = new RegExp(EnumRegExp.EMAIL_REGEXP);

  constructor(private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.onRefresh('userEmail');
  }

  public onBlur(): void {
    this.isInvalid = false;
  }

  public onRefresh(item: string): void {
    if (this.localStorageService.getItem(item) !== null) {
      this.isSubscribed = true;
    }
  }

  public saveUser(): void {
    this.localStorageService.setData(this.inputText);
    this.localStorageService.localStorageAdd('userEmail');
    this.isSubscribed = true;
  }

  public deleteUser(): void {
    this.localStorageService.localStorageDelete('userEmail');
    this.isSubscribed = false;
  }

  public onValidate(): void {
    const isValid = this.emailRegExp.test(this.inputText);

    this.localStorageService.setData(this.inputText);
    this.buttonDisabled = !isValid;
    this.isInvalid = !isValid;
  }
}

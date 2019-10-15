import { Component, OnInit }   from '@angular/core';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})

export class JoinUsComponent implements OnInit {
  public buttonDisabled = true;
  public emailValid = false;
  public invalid = false;
  public formText = {
    success: 'You have successfully subscribed to our newsletter',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
    message: 'Subscribe to Newsletter:'
  };
  private emailRegEx = /^(?=^.{6,25}$)(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,4}$/;

  constructor(private localStorageService: LocalStorageService){}

  public ngOnInit(): void {
    this.localStorageService.onRefresh('userEmail');
  }

  public onBlur(): void {
    this.localStorageService.userEmail = '';
    this.invalid = false;
  }
  
  public saveUser(): void {
    this.localStorageService.localStorageAdd('userEmail')
  }

  public deleteUser(): void {
    this.localStorageService.localStorageDelete('userEmail')
  }

  public onValidate(value?: string): void {
    if (this.emailRegEx.test(value || this.localStorageService.userEmail)) {
      this.buttonDisabled = false;
      this.invalid = false;
    } else {
      this.invalid = true;
      this.buttonDisabled = true;
    };
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { SetValueToStorage } from '../../store/actions/web-storage.actions';

import { LocalStorageService } from 'src/app/shared/services/web-storage/local-storage.service';
import { ToastrMessage } from '../../app.enum';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.html',
  styleUrls: ['./user-profile-page.scss']
})

export class UserProfilePageComponent implements OnInit {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store<IAppState>,
    private readonly toastrService: ToastrService,
    ) { }

  @ViewChild('userFirstName', {static: false}) userFirstName: ElementRef;
  @ViewChild('userLastName', {static: false}) userLastName: ElementRef;

  public changeUserName = false;
  public changeUserPassword = false;
  public changeUserEmail = false;
  public userName: string;
  public userAvatarUrl = '../../../assets/img/bored-boredom-casual.jpg';

  public ngOnInit(): void {
    this.userName = this.localStorageService.getItem('userFullName');

    this.store.dispatch(new SetValueToStorage('userFullName', this.userAvatarUrl));
  }

  public onChangeUserName(): void {
    this.changeUserName = !this.changeUserName;
    this.changeUserPassword = false;
    this.changeUserEmail = false;
  }

  public onChangeUserPassword(): void {
    this.changeUserPassword = !this.changeUserPassword;
    this.changeUserName = false;
    this.changeUserEmail = false;
  }

  public onChangeUserEmail(): void {
    this.changeUserEmail = !this.changeUserEmail;
    this.changeUserName = false;
    this.changeUserPassword = false;
  }

  public onUpdateUserName(): void {
    // UPDATE UserName
    this.userFirstName.nativeElement.value ||
    this.userLastName.nativeElement.value ?
    this.userName = `${this.userFirstName.nativeElement.value} ${
      this.userLastName.nativeElement.value}` :
    this.toastrService.error(ToastrMessage.userNameError);

    this.localStorageService
      .localStorageAdd('userFullName', this.userName);

    this.onChangeUserName();
  }

  public onUpdatePassword(): void {
    // UPDATE Password

    this.onChangeUserPassword();
  }

  public onUpdateUserEmail(): void {
    // UPDATE UserEmail

    this.onChangeUserEmail();
  }
}

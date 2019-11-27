import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { getAuth } from 'src/app/store/selectors/app.selectors';
import { LogIn, SignUp } from '../../store/actions/auth.actions';

import { EnumRegExp } from '../../app.enum';
import { User } from '../../interfaces/user';
import { ModalService } from '../../shared/services/modal-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})

export class AuthComponent implements OnInit {
  public user = new User();
  public currentState$: Observable<any>;
  public errorMessage: string | null;
  public isEmailValid = true;
  public isPasswordValid = true;
  public isLoginOpen: boolean;

  private emailRegExp = new RegExp(EnumRegExp.EMAIL_REGEXP);
  private passwordRegExp = new RegExp(EnumRegExp.PASSWORD_REGEXP);

  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.currentState$ = this.store.select(getAuth);
    this.currentState$
      .subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
    this.isLoginOpen = this.modalService.isModalOpened.login;
  }

  public onValidateEmail(): void {
    this.isEmailValid = this.emailRegExp.test(this.user.email);
  }

  public onValidatePassword(): void {
    this.isPasswordValid = this.passwordRegExp.test(this.user.password);
  }

  public onSubmit(): void {
    if (this.isEmailValid && this.isPasswordValid && this.user.password) {
      const payload = {
        email: this.user.email,
        password: this.user.password
    };
      this.isLoginOpen ?
        this.store.dispatch(new LogIn(payload)) :
        this.store.dispatch(new SignUp(payload));
    }
  }

  public closeModal(modalName: string): void {
    this.modalService.close(modalName);
  }

  public openModal(modalName: string): void {
    this.modalService.open(modalName);
  }
}

import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../interfaces/user';
import { ModalService } from '../../shared/services/modal-service';
import { IAppState, selectAuthState } from '../../store/app.store';
import { LogIn } from '../../store/actions/auth.actions';
import { EnumRegExp } from '../../app.enum';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.scss']
})

export class LogInComponent implements OnInit {
  public user = new User();
  public getState: Observable<any>;
  public errorMessage: string | null;
  public isEmailValid = true;
  public isPasswordValid = true;

  private emailRegExp = new RegExp(EnumRegExp.EMAIL_REGEXP);
  private passwordRegExp = new RegExp(EnumRegExp.PASSWORD_REGEXP);

  constructor(
    public modalService: ModalService,
    private store: Store<IAppState>,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  public ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  public onValidateEmail(): boolean {
    return this.isEmailValid = this.emailRegExp.test(this.user.email);
  }

  public onValidatePassword(): boolean {
    return this.isPasswordValid = this.passwordRegExp.test(this.user.password);
  }

  public onSubmit(): void {
    if (this.isEmailValid && this.isPasswordValid && this.user.password) {
      const payload = {
        email: this.user.email,
        password: this.user.password
      };
      localStorage.setItem('userName', this.user.email.split('@')[0]);
      this.store.dispatch(new LogIn(payload));
    }
  }
}

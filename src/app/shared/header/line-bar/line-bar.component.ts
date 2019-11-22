import { Component, OnInit } from '@angular/core';
import {
  faFacebookF, faTwitter, faGoogle
} from '@fortawesome/free-brands-svg-icons';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '../../../shared/services/modal-service';
import { IAppState, selectAuthState } from 'src/app/store/app.store';
import { LogOut, IsLoggedIn } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { getUserFirstName } from 'src/app/store/selectors/auth.selector';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.html',
  styleUrls: ['./line-bar.scss']
})
export class LineBarComponent implements OnInit {
  public getState: Observable<any>;
  public isAuthenticated: false;
  public user = null;
  public errorMessage = null;

  constructor(
    public modalService: ModalService,
    private store: Store<IAppState>,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;
  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';
  public userName$: Observable<string>;
  public isSignUpOpen: boolean;
  public isLoginOpen: boolean;

  public ngOnInit(): void {
    this.userName$ = this.store.select(getUserFirstName)
      .pipe(
        map(name => name = this.localStorageService.getItem('userName')));

    if (this.authService.getToken()) {
      this.store.dispatch(new IsLoggedIn());
    }

    this.getState = this.store.select(selectAuthState);
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;
    });

    this.isSignUpOpen = this.modalService.isModalOpened.signUp;
    this.isLoginOpen = this.modalService.isModalOpened.login;
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }

  public closeModal(modalName: string): void {
    this.modalService.close(modalName);
  }

  public openModal(modalName: string): void {
    this.modalService.open(modalName);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAuth } from 'src/app/store/selectors/app.selectors';
import { LogOut, IsLoggedIn } from 'src/app/store/actions/auth.actions';

import { ModalService } from '../../../shared/services/modal-service';
import { AuthService } from '../../services/auth.service';
import { getUserFirstName, getUserFullName } from 'src/app/store/selectors/auth.selector';
import { LocalStorageService } from '../../services';
import { getStorageStatus } from 'src/app/store/selectors/web-storage.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.html',
  styleUrls: ['./line-bar.scss']
})
export class LineBarComponent implements OnInit, OnDestroy {
  public getState: Observable<any>;
  public isAuthenticated: false;
  public user = null;
  public errorMessage = null;
  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;
  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';
  public userName$: Observable<string>;
  public isSignUpOpen: boolean;
  public isLoginOpen: boolean;
  public userFullName: string;
  public userAvatarUrl = '/assets/img/vlad.png';
  public storeSub: Subscription;

  constructor(
    public modalService: ModalService,
    private store: Store<IAppState>,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  public ngOnInit(): void {

    this.userName$ = this.store.select(getUserFirstName)
      .pipe(
        map(() =>
          this.localStorageService.getItem('userFullName') ?
            this.localStorageService.getItem('userFullName').split(' ')[0] :
            this.localStorageService.getItem('userName')));

    this.userName$ = this.store.select(getUserFullName).pipe(map(state =>
      state || this.localStorageService.getItem('userName')));

    if (this.authService.getToken()) {
      this.store.dispatch(new IsLoggedIn());
    }

    this.getState = this.store.select(getAuth);

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

  public ngOnDestroy(): void { }
}

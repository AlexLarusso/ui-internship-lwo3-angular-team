import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from 'src/app/store/auth/auth.facade';
import { ModalService, LocalStorageService, AuthService  } from '../../../shared/services';

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
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public authFacade: AuthFacade
  ) { }

  public ngOnInit(): void {

    this.userName$ = this.authFacade.userFirstName$
      .pipe(
        map(() =>
          this.localStorageService.getItem('userFullName') ?
            this.localStorageService.getItem('userFullName').split(' ')[0] :
            this.localStorageService.getItem('userName')));

    this.userName$ = this.authFacade.userFullName$.pipe(map(state =>
      state || this.localStorageService.getItem('userName')));

    if (this.authService.getToken()) {
      this.authFacade.isLoggedIn();
    }

    this.getState = this.authFacade.authState$;

    this.getState.subscribe((state) => {
      this.isAuthenticated = state;
    });

    this.isSignUpOpen = this.modalService.isModalOpened.signUp;
    this.isLoginOpen = this.modalService.isModalOpened.login;
  }

  public logOut(): void {
    this.authFacade.logOut();
  }

  public closeModal(modalName: string): void {
    this.modalService.close(modalName);
  }

  public openModal(modalName: string): void {
    this.modalService.open(modalName);
  }

  public ngOnDestroy(): void { }
}

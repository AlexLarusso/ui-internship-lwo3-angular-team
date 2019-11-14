import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { ModalService } from './modal-service';
import { IAppState } from 'src/app/store/app.store';
import { AccessDenied } from 'src/app/store/actions/auth.actions';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private modalService: ModalService,
    private store: Store<IAppState>
  ) {}

  public canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.store.dispatch(new AccessDenied());
      this.modalService.open('login');

      return false;
    }
    return true;
  }
}

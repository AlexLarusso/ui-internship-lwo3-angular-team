import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { ModalService } from './modal-service';
import { IAppState } from 'src/app/store/app.store';
import { AccessDenied } from 'src/app/store/actions/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessage } from 'src/app/app.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly modalService: ModalService,
    private readonly store: Store<IAppState>,
    private readonly toastrService: ToastrService
  ) { }

  public canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.store.dispatch(new AccessDenied());
      this.modalService.open('login');
      this.toastrService.error(ToastrMessage.accessDenied);
      return false;
    }

    return true;
  }
}

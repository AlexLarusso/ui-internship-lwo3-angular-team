import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


import { AuthFacade } from 'src/app/store/auth/auth.facade';
import { ToastrMessage } from 'src/app/app.enum';
import { AuthService } from './auth.service';
import { ModalService } from './modal-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly modalService: ModalService,
    private readonly toastrService: ToastrService,
    public authFacade: AuthFacade
  ) { }

  public canActivate(): boolean {
    if (!this.auth.getToken()) {

      this.authFacade.accessDenied();

      this.modalService.open('login');

      this.toastrService.error(ToastrMessage.accessDenied);

      return false;
    }

    return true;
  }
}

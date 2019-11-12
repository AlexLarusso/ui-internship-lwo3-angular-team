import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { ModalService } from './modal-service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/');
      this.modalService.open('login');
      return false;
    }
    return true;
  }
}

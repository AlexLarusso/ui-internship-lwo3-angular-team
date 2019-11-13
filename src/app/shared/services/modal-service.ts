import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  public isLoginModalOpen = false;
  public isSignUpModalOpen = false;


  public open(id: string): void {
    id === 'login' ? this.isLoginModalOpen = true : this.isSignUpModalOpen = true;
  }

  public close(id: string): void {
    id === 'login' ? this.isLoginModalOpen = false : this.isSignUpModalOpen = false;
  }
}

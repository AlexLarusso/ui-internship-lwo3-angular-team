import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  public isModalOpened = {
    login: false,
    signUp: false,
    userProfile: false
  };

  public open(modalName: string): void {
    this.isModalOpened[modalName] = true;
  }

  public close(modalName: string): void {
    this.isModalOpened[modalName] = false;
  }
}

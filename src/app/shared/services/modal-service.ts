import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  public isModalOpened = {
    login: false,
    signUp: false,
    //USER PROFILE
    userProfile: false
  };

  public open(modalName: string): void {
    this.isModalOpened[modalName] = true;
  }

  public close(modalName: string): void {
    this.isModalOpened[modalName] = false;
  }
}

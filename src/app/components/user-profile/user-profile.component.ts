import { Component, Input } from '@angular/core';

import { ModalService } from '../../shared/services/modal-service';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})

export class UserProfileComponent {
  constructor(
    private readonly modalService: ModalService
  ) { }

  @Input() public userShoppingHistory: Array<IProduct>;
  @Input() public userWishList: Array<IProduct>;

  public userAvataUrl = '/assets//img/spring_fashion.jpg';

  public onCloseModal(userProfile): void {
    this.modalService.close(userProfile);
  }
}

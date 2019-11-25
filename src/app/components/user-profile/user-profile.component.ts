import { Component, Input } from '@angular/core';

import { ModalService } from '../../shared/services/modal-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})

export class UserProfileComponent {
  constructor(
    private readonly modalService: ModalService
  ) { }

  @Input() userAvatar: string;
  @Input() userShoppingHistory;
  @Input() userWishList;

  public onCloseModal(userProfile): void {
    this.modalService.close(userProfile);
  }
}

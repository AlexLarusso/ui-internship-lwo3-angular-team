import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})

export class UserProfileComponent {
  @Input() userAvatar: string;
  @Input() userShoppingHistory;
  @Input() userWishList;
}

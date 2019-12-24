import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserWishListPageComponent } from './user-wish-list-page.component';
import { AuthGuardService as AuthGuard } from '../../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'user-wishlist',
    component: UserWishListPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    UserWishListPageComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    UserWishListPageComponent
  ]
})

export class UserWishListPageModule { }

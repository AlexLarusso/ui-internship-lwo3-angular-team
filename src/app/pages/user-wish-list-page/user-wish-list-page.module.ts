import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserWishListPageComponent } from './user-wish-list-page.component';

const routes: Routes = [
  {
    path: 'user-wishlist',
    component: UserWishListPageComponent,
  }
];

@NgModule({
  declarations: [
    UserWishListPageComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    RouterModule,
    UserWishListPageComponent
  ]
})

export class UserWishListPageModule { }

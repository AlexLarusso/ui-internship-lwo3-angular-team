import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';
import { SharedModule } from '../../shared/shared.module';

import { WishListComponent } from '../../components/wish-list/wish-list.component';
import { AuthGuardService as AuthGuard } from '../../shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    WishListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ScrollService,
    AuthGuard
  ],
  exports: [
    WishListComponent,
    RouterModule
  ]
})

export class WishListPageModule { }

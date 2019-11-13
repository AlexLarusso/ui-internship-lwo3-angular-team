import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';
import { SharedModule } from '../../shared/shared.module';

import { WishListComponent } from '../../components/wish-list/wish-list.component';


const routes: Routes = [
  {
    path: 'wishlist',
    component: WishListComponent,
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
  ],
  exports: [
    WishListComponent,
    RouterModule
  ]
})

export class WishListPageModule { }

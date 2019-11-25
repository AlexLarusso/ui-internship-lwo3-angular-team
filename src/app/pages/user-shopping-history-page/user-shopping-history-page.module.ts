import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserShoppingHistoryPageComponent } from './user-shopping-history-page.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: 'user-shopping-history',
    component: UserShoppingHistoryPageComponent,
  }
];

@NgModule({
  declarations: [
    UserShoppingHistoryPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
  ],
  exports: [
    RouterModule,
    UserShoppingHistoryPageComponent
  ]
})

export class UserShoppingHistoryPageModule { }

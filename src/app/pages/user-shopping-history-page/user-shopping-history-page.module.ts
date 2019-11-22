import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserShoppingHistoryPageComponent } from './user-shopping-history-page.component';

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
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    RouterModule,
    UserShoppingHistoryPageComponent
  ]
})

export class UserShoppingHistoryPageModule { }

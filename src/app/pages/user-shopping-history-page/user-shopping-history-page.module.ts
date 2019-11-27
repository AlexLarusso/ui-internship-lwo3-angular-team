import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserShoppingHistoryPageComponent } from './user-shopping-history-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuardService as AuthGuard } from '../../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'user-shopping-history',
    component: UserShoppingHistoryPageComponent,
    canActivate: [AuthGuard]
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
  exports: [
    RouterModule,
    UserShoppingHistoryPageComponent
  ]
})

export class UserShoppingHistoryPageModule { }

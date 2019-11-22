import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePageComponent } from './user-profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfilePageComponent,
  }
];

@NgModule({
  declarations: [
    UserProfilePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    RouterModule,
    UserProfilePageComponent
  ]
})

export class UserProfilePageModule { }

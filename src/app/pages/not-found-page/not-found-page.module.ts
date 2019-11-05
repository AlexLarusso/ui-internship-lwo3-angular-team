import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page.component';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundPageComponent
  }
];

@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class NotFoundPageModule { }

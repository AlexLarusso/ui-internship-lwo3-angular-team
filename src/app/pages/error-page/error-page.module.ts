import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page.component';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [
    ErrorPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    ErrorPageComponent,
    RouterModule
  ]
})
export class ErrorPageModule { }

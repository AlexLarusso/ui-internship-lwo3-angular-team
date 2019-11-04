import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorSampleComponent } from './error-sample.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: ErrorSampleComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    RouterModule
  ]
})

export class ErrorSampleModule { }

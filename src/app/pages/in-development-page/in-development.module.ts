import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InDevelopmentPageComponent } from './in-development-page.component';

const routes: Routes = [
  {
    path: 'in-development',
    component: InDevelopmentPageComponent
  }
];

@NgModule({
  declarations: [
    InDevelopmentPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class InDevelopmentPageModule { }

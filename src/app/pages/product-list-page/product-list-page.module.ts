import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListPageComponent } from '../product-list-page/product-list-page.component';

const routes: Routes = [
  {
    path: 'category/:category',
    component: ProductListPageComponent,
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    RouterModule
  ]
})

export class ProductListPageModule { }


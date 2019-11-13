import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CartPageComponent } from './cart-page.component';
import { ProductCartItemComponent } from 'src/app/components/product-cart-item/product-cart-item.component';

const routes: Routes = [
  {
    path: 'shopping-cart',
    component: CartPageComponent
  }
];

@NgModule({
  declarations: [
    CartPageComponent,
    ProductCartItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    CartPageComponent,
    ProductCartItemComponent,
    RouterModule,
  ]
})
export class CartPageModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CartPageComponent } from './cart-page.component';
import { ProductCartItemComponent } from 'src/app/components/product-cart-item/product-cart-item.component';

@NgModule({
  declarations: [
    CartPageComponent,
    ProductCartItemComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule
  ],
  providers: [
  ],
  exports: [
    CartPageComponent,
    ProductCartItemComponent,
  ]
})
export class CartPageModule { }

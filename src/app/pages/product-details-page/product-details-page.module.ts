import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { ProductOrderComponent } from '../../components/product-order/product-order.component';
@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductOrderComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
  ],
  exports: [
    ProductDetailsComponent,
    ProductOrderComponent
  ]
})

export class ProductDetailsPageModule { }



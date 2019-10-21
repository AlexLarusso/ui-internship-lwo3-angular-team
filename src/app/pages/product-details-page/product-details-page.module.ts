import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { ProductOrderComponent } from 'src/app/components/product-order/product-order.component';
import { ProductPreviewComponent } from 'src/app/components/product-preview/product-preview.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductOrderComponent,
    ProductPreviewComponent
  ],
  imports: [
    SharedModule,
    BrowserModule
  ],
  providers: [
  ],
  exports: [
    ProductDetailsComponent,
    ProductOrderComponent,
    ProductPreviewComponent
  ]
})

export class ProductDetailsPageModule { }



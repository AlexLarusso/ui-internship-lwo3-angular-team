import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { ProductOrderComponent } from 'src/app/components/product-order/product-order.component';
import { ProductPreviewComponent } from 'src/app/components/product-preview/product-preview.component';
import { SimilarProductsComponent } from 'src/app/components/similar-products/similar-products.component';

@NgModule({
  declarations: [
    SimilarProductsComponent,
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
    SimilarProductsComponent,
    ProductDetailsComponent,
    ProductOrderComponent,
    ProductPreviewComponent
  ]
})

export class ProductDetailsPageModule { }

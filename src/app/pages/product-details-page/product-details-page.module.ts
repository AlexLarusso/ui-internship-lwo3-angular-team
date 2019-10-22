import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';

import { SimilarProductsComponent } from 'src/app/components/similar-products/similar-products.component';

@NgModule({
  declarations: [
    SimilarProductsComponent
  ],
  imports: [
    SharedModule,
    BrowserModule
  ],
  providers: [
  ],
  exports: [
    SimilarProductsComponent
  ]
})

export class ProductDetailsPageModule { }

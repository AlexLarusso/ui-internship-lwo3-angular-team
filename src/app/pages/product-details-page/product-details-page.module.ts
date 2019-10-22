import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

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

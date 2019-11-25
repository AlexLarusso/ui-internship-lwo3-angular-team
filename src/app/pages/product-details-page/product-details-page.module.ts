import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgxImageZoomModule } from 'ngx-image-zoom';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { ProductOrderComponent } from 'src/app/components/product-order/product-order.component';
import { ProductPreviewComponent } from 'src/app/components/product-preview/product-preview.component';
import { SimilarProductsComponent } from 'src/app/components/similar-products/similar-products.component';
import { ProductResolver } from 'src/app/shared/services/product.resolver';
import { ProductDetailsPageComponent } from './product-details-page.component';

const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetailsPageComponent,
    resolve: { products: ProductResolver }
  }
];

@NgModule({
  declarations: [
    SimilarProductsComponent,
    ProductDetailsComponent,
    ProductOrderComponent,
    ProductPreviewComponent,
    ProductDetailsPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxImageZoomModule.forRoot()
  ],
  providers: [
  ],
  exports: [
    SimilarProductsComponent,
    ProductDetailsComponent,
    ProductOrderComponent,
    ProductPreviewComponent,
    RouterModule
  ]
})

export class ProductDetailsPageModule { }

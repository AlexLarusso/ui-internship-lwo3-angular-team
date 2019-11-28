import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RatingModule } from 'ng-starrating';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { ProductOrderComponent } from 'src/app/components/product-order/product-order.component';
import { ProductPreviewComponent } from 'src/app/components/product-preview/product-preview.component';
import { SimilarProductsComponent } from 'src/app/components/similar-products/similar-products.component';
import { ProductResolver } from 'src/app/shared/services/product.resolver';
import { ProductDetailsPageComponent } from './product-details-page.component';
import { ProductReviewComponent } from '../../components/product-review/product-review.component';

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
    ProductDetailsPageComponent,
    ProductReviewComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxImageZoomModule.forRoot(),
    RatingModule
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { NotFoundPageModule } from './pages/not-found-page/not-found-page.module';
import { ProductDetailsPageModule } from './pages/product-details-page/product-details-page.module';
import { ProductListPageModule } from './pages/product-list-page/product-list-page.module';
import { WishListPageModule } from './pages/wish-list-page/wish-list-page.module';
import { ErrorSampleModule } from './pages/error-sample/error-sample.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => HomePageModule
  },
  {
    path: 'category/:category',
    loadChildren: () => ProductListPageModule
  },
  {
    path: 'products/:id',
    loadChildren: () => ProductDetailsPageModule
  },
  {
    path: '404',
    loadChildren: () => NotFoundPageModule
  },
  {
    path: 'wishlist',
    loadChildren: () => WishListPageModule
  },
  {
    path: 'error',
    loadChildren: () => ErrorPageModule
  },
  {
    path: 'checkout',
    loadChildren: () => ErrorSampleModule
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomePageModule,
    NotFoundPageModule,
    ProductDetailsPageModule,
    ProductListPageModule,
    WishListPageModule,
    SharedModule,
    ErrorSampleModule,
    ErrorPageModule,
  ],
  exports: [
    HomePageModule,
    NotFoundPageModule,
    ProductDetailsPageModule,
    ProductListPageModule,
    WishListPageModule,
    SharedModule,
    ErrorSampleModule,
    ErrorPageModule,
  ]
})

export class RoutesModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { NotFoundPageModule } from './pages/not-found-page/not-found-page.module';
import { ProductDetailsPageModule } from './pages/product-details-page/product-details-page.module';
import { ProductListPageModule } from './pages/product-list-page/product-list-page.module';
import { WishListPageModule } from './pages/wish-list-page/wish-list-page.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { CartPageModule } from './pages/cart-page/cart-page.module';
import { UserProfilePageModule } from './pages/user-profile-page/user-profile-page.module';
import { UserShoppingHistoryPageModule } from './pages/user-shopping-history-page/user-shopping-history-page.module';
import { UserWishListPageModule } from './pages/user-wish-list-page/user-wish-list-page.module';
import { InDevelopmentPageModule } from './pages/in-development-page/in-development.module';

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
    path: 'in-development',
    loadChildren: () => InDevelopmentPageModule
  },
  {
    path: 'shopping-cart',
    loadChildren: () => CartPageModule
  },
  {
    path: 'user-profile',
    loadChildren: () => UserProfilePageModule
  },
  {
    path: 'user-shopping-history',
    loadChildren: () => UserShoppingHistoryPageModule
  },
  {
    path: 'user-wishlist',
    loadChildren: () => UserWishListPageModule
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
    ErrorPageModule,
    CartPageModule,
    UserProfilePageModule,
    UserShoppingHistoryPageModule,
    UserWishListPageModule,
    InDevelopmentPageModule
  ],
  exports: [
    HomePageModule,
    NotFoundPageModule,
    ProductDetailsPageModule,
    ProductListPageModule,
    WishListPageModule,
    SharedModule,
    ErrorPageModule,
    CartPageModule,
    UserProfilePageModule,
    UserShoppingHistoryPageModule,
    UserWishListPageModule,
    InDevelopmentPageModule
  ]
})

export class RoutesModule { }

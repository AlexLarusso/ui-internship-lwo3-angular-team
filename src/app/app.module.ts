import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { ProductDetailsPageModule } from './pages/product-details-page/product-details-page.module';
import { ProductListPageModule } from './pages/product-list-page/product-list-page.module';
import { WishListPageModule } from './pages/wish-list-page/wish-list-page.module';
import { ErrorSampleModule } from './pages/error-sample/error-sample.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { CartPageModule } from './pages/cart-page/cart-page.module';

import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { ProductResolver } from './shared/services/product.resolver';
import { ErrorsHandler } from './shared/services/errors.handler';

import { appReducer } from './store/app.store';

import { LoaderComponent } from './shared/loader/loader.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { WishListPageComponent } from './pages/wish-list-page/wish-list-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorSampleComponent } from './pages/error-sample/error-sample.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { ProductsEffects } from './store/effects/products.effects';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'women', component: ProductListPageComponent },
  { path: 'men', component: ProductListPageComponent },
  { path: 'winter', component: ProductListPageComponent },
  { path: 'spring', component: ProductListPageComponent },
  { path: 'summer', component: ProductListPageComponent },
  { path: 'fall', component: ProductListPageComponent },
  { path: 'products/:id', component: ProductDetailsPageComponent, resolve: { products: ProductResolver } },
  { path: '404', component: NotFoundComponent },
  { path: 'wishlist', component: WishListPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'checkout', component: ErrorSampleComponent },
  { path: 'shoppingcart', component: CartPageComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent,
    WishListPageComponent,
    LoaderComponent,
    CounterComponent,
    NotificationComponent,
    ErrorSampleComponent,
  ],
  imports: [
    HomeModule,
    NotFoundModule,
    ProductDetailsPageModule,
    ProductListPageModule,
    WishListPageModule,
    SharedModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({}),
    ErrorSampleModule,
    EffectsModule.forRoot([ProductsEffects]),
    ErrorPageModule,
    CartPageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    // { provide: ErrorHandler, useClass: ErrorsHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

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

import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { ErrorsHandler } from './shared/services/errors.handler';

import { appReducer } from './store/app.store';
import { ProductsEffects } from './store/effects/products.effects';

import { LoaderComponent } from './shared/loader/loader.component';
import { AppComponent } from './app.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { WishListPageComponent } from './pages/wish-list-page/wish-list-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorSampleComponent } from './pages/error-sample/error-sample.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'category/:category',
    loadChildren: () => import('./pages/product-list-page/product-list-page.module')
      .then(mod => mod.ProductListPageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/product-details-page/product-details-page.module')
      .then(mod => mod.ProductDetailsPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.module')
      .then(mod => mod.NotFoundModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./pages/wish-list-page/wish-list-page.module')
      .then(mod => mod.WishListPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error-page/error-page.module')
      .then(mod => mod.ErrorPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/error-sample/error-sample.module')
      .then(mod => mod.ErrorSampleModule)
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListPageComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorsHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

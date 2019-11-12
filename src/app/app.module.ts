import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './app.routes';

import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { ErrorsHandler } from './shared/services/errors.handler';

import { appReducer } from './store/app.store';
import { ProductsEffects } from './store/effects/products.effects';
import { CartEffects } from './store/effects/cart.effects';

import { LoaderComponent } from './shared/loader/loader.component';
import { AppComponent } from './app.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { WishListPageComponent } from './pages/wish-list-page/wish-list-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorSampleComponent } from './pages/error-sample/error-sample.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

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
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ProductsEffects, CartEffects]),
    RoutesModule
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

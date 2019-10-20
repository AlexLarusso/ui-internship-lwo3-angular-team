import { NgModule } from '@angular/core';
import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolver } from './shared/services/product.resolver';
import { HttpService } from './shared/services/http.service';
import { HomeModule } from './pages/home/home.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { ProductDetailsPageModule } from './pages/product-details-page/product-details-page.module';
import { ProductListPageModule } from './pages/product-list-page/product-list-page.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/reducers/app.reducer';

import { LoaderComponent } from './shared/loader/loader.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'woman', component: ProductListPageComponent },
  { path: 'products/:id', component: ProductDetailsPageComponent, resolve: { products: ProductResolver } },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent,
    LoaderComponent,
    CounterComponent
  ],
  imports: [
    HomeModule,
    NotFoundModule,
    ProductDetailsPageModule,
    ProductListPageModule,
    SharedModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [
    HttpService,
    ProductResolver,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

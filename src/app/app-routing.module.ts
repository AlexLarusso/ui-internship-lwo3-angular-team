import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent }        from './pages/not-found/not-found.component';
import { HomeComponent }            from './pages/home/home.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',         component: HomeComponent, data: { title: 'Home' } },
  { path: 'products',     component: ProductListPageComponent, data: { title: 'Product List' } },
  { path: 'products/:id', component: ProductDetailsPageComponent, data: { title: 'Product Item' } },
  { path: '404',          component: NotFoundComponent, data: { title: 'Not Found' }},
  { path: '**',           redirectTo: '/404'},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

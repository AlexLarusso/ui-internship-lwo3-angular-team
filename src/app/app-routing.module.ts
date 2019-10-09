import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent }    from './not-found/not-found.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { ProductItemComponent } from './shared/product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404'},
  { path: '404', component: NotFoundComponent, data: { title: 'Heroes List' }},
  { path: 'products', component: ProductListComponent, data: { title: 'Product List' } },
  { path: 'products/:id', component: ProductItemComponent, data: { title: 'Product Item' } },
  { path: 'home', component: PopularListComponent, data: { title: 'Popular' } }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

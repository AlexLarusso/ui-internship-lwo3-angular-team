import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }        from '@angular/common/http';
import { HttpService }             from './http.service';
import { FontAwesomeModule }       from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }            from './app.component';
import { HeaderComponent }         from './header/header.component';
import { ButtonComponent }         from './shared/button/button.component';
import { MainLogoComponent }       from './shared/main-logo/main-logo.component';
import { ProductItemComponent }    from './shared/product-item/product-item.component';
import { PromoComponent }          from './promo/promo.component';
import { CategoryMenuComponent }   from './header/category-menu/category-menu.component';
import { LineBarComponent }        from './header/line-bar/line-bar.component';
import { FooterComponent }         from './footer/footer.component';
import { SaleBannerComponent }     from './shared/sale-banner/sale-banner.component';
import { MainComponent }           from './main/main.component';
import { StoryComponent }          from './main/story/story.component';
import { ProductListComponent }    from './product-list/product-list.component';
import { MainMenuComponent }       from './header/main-menu/main-menu.component';
import { ParallaxComponent }       from './parallax/parallax.component';
import { PopularListComponent }    from './popular-list/popular-list.component';
import { ProductShortInfoService } from './product-short-info.service';
import { NotFound }                from './pages/not-found/not-found';
import { Home }                    from './pages/home/home';
import { ProductListPage }         from './pages/product-list-page/product-list-page';
import { ProductDetailsComponent }  from './product-details/product-details.component';
import { ProductDetailsPage }      from './pages/product-details-page/product-details-page';
import { ProductResolver }         from './product.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'woman', component: ProductListPage },
  { path: 'products/:id', component: ProductDetailsPage, resolve: { products: ProductResolver } },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    MainLogoComponent,
    ProductItemComponent,
    PromoComponent,
    CategoryMenuComponent,
    LineBarComponent,
    FooterComponent,
    SaleBannerComponent,
    MainComponent,
    StoryComponent,
    ProductListComponent,
    MainMenuComponent,
    ParallaxComponent,
    PopularListComponent,
    NotFound,
    Home,
    ProductListPage,
    ProductDetailsComponent,
    ProductDetailsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    ProductShortInfoService,
    ProductResolver
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}

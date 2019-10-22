import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';

import { HeaderComponent } from './header/header.component';
import { CategoryMenuComponent } from './header/category-menu/category-menu.component';
import { LineBarComponent } from './header/line-bar/line-bar.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { FooterComponent } from './footer/footer.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ButtonComponent } from './button/button.component';
import { MainLogoComponent } from './main-logo/main-logo.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SaleBannerComponent } from './sale-banner/sale-banner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PopularListComponent,
    ProductCarouselComponent,
    ButtonComponent,
    MainLogoComponent,
    ProductItemComponent,
    ProductListComponent,
    SaleBannerComponent,
    CategoryMenuComponent,
    LineBarComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [
    ProductService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PopularListComponent,
    ProductCarouselComponent,
    ButtonComponent,
    MainLogoComponent,
    ProductItemComponent,
    ProductListComponent,
    SaleBannerComponent,
    FontAwesomeModule,
    FormsModule
  ]
})

export class SharedModule { }

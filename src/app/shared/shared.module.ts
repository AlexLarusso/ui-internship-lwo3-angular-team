import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScrollAnchorDirective } from './directives';
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
import { AccordeonComponent } from './accordeon/accordeon.component';
import { SelectColorComponent } from './select-color/select-color.component';
import { SelectNumberComponent } from './select-number/select-number.component';
import { DropdownComponent } from './dropdown/dropdown-component';
import { SelectSizeComponent } from './select-size/select-size.component';
import { WishButtonComponent } from './wish-button/wish-button.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';

@NgModule({
  declarations: [
    ScrollAnchorDirective,
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
    AccordeonComponent,
    SelectColorComponent,
    SelectNumberComponent,
    DropdownComponent,
    SelectSizeComponent,
    WishButtonComponent,
    ShopByCategoryComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [
  ],
  exports: [
    ScrollAnchorDirective,
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
    FormsModule,
    AccordeonComponent,
    SelectColorComponent,
    SelectNumberComponent,
    DropdownComponent,
    SelectSizeComponent,
    WishButtonComponent,
    ShopByCategoryComponent
  ]
})

export class SharedModule { }

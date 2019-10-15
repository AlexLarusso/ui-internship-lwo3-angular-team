import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlideshowComponent } from './slideshow/slideshow.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { MainLogoComponent } from './shared/main-logo/main-logo.component';
import { ProductItemComponent } from './shared/product-item/product-item.component';
import { PromoComponent } from './header/promo/promo.component';
import { CategoryMenuComponent } from './header/category-menu/category-menu.component';
import { LineBarComponent } from './header/line-bar/line-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SaleBannerComponent } from './shared/sale-banner/sale-banner.component';
import { MainComponent } from './main/main.component';
import { StoryComponent } from './main/story/story.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { ProductShortInfoService } from './product-short-info.service';
import { ProductCarouselComponent } from './shared/product-carousel/product-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
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
    ProductCarouselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [HttpService,
    ProductShortInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

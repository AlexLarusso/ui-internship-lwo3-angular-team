import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    PopularListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [HttpService,
    ProductShortInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

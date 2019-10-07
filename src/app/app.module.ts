import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { MainLogoComponent } from './shared/main-logo/main-logo.component';
import { ProductItemComponent } from './shared/product-item/product-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromoComponent } from './header/promo/promo.component';
import { CategoryMenuComponent } from './header/category-menu/category-menu.component';
import { LineBarComponent } from './header/line-bar/line-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SaleBannerComponent } from './shared/sale-banner/sale-banner.component';
import { MainComponent } from './main/main.component';
import { StoryComponent } from './main/story/story.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { ProductListComponent } from './product-list/product-list.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopularListComponent } from './popular-list/popular-list.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

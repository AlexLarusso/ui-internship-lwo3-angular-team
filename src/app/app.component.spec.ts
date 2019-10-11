import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JoinUsComponent } from '../app/join-us/join-us.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
 ],
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
        JoinUsComponent
      ],
      providers: [HttpService,
      ProductShortInfoService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ui-internship-lwo3-angular-team'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ui-internship-lwo3-angular-team');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ui-internship-lwo3-angular-team app is running!');
  });
});

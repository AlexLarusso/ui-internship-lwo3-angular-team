import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { PromoComponent } from 'src/app/components/promo/promo.component';
import { ParallaxComponent } from 'src/app/components/parallax/parallax.component';
import { StoryComponent } from 'src/app/components/story/story.component';
import { ScrollComponent } from 'src/app/components/scroll/scroll.component';
import { SlideshowComponent } from 'src/app/components/slideshow/slideshow.component';
import { JoinUsComponent } from 'src/app/components/join-us/join-us.component';
import { RecentlyViewedComponent } from '../../components/recently-viewed/recently-viewed.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [
    PromoComponent,
    ParallaxComponent,
    StoryComponent,
    ScrollComponent,
    SlideshowComponent,
    JoinUsComponent,
    RecentlyViewedComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [
    PromoComponent,
    ParallaxComponent,
    StoryComponent,
    ScrollComponent,
    JoinUsComponent,
    BrowserAnimationsModule,
    RecentlyViewedComponent,
    RouterModule
  ]
})

export class HomeModule { }

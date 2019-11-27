import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { PromoComponent } from 'src/app/components/promo/promo.component';
import { StoryComponent } from 'src/app/components/story/story.component';
import { SlideshowComponent } from 'src/app/components/slideshow/slideshow.component';
import { JoinUsComponent } from 'src/app/components/join-us/join-us.component';
import { RecentlyViewedComponent } from '../../components/recently-viewed/recently-viewed.component';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  }
];

@NgModule({
  declarations: [
    PromoComponent,
    StoryComponent,
    SlideshowComponent,
    JoinUsComponent,
    RecentlyViewedComponent,
    HomePageComponent
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
    StoryComponent,
    JoinUsComponent,
    RecentlyViewedComponent,
    RouterModule
  ]
})

export class HomePageModule { }

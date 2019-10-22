import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollService } from '../../shared/services/scroll.service';
import { ScrollAnchorDirective } from 'src/app/shared/directives/scroll-anchor.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { PromoComponent } from '../../components/promo/promo.component';
import { ParallaxComponent } from '../../components/parallax/parallax.component';
import { StoryComponent } from '../../components/story/story.component';
import { ScrollComponent } from '../../components/scroll/scroll.component';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { JoinUsComponent } from '../../components/join-us/join-us.component';
import { RecentlyViewedComponent } from '../../components/recently-viewed/recently-viewed.component';

@NgModule({
  declarations: [
    PromoComponent,
    ParallaxComponent,
    StoryComponent,
    ScrollComponent,
    SlideshowComponent,
    ScrollAnchorDirective,
    JoinUsComponent,
    RecentlyViewedComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [
    ScrollService,
  ],
  exports: [
    PromoComponent,
    ParallaxComponent,
    StoryComponent,
    ScrollComponent,
    ScrollAnchorDirective,
    JoinUsComponent,
    BrowserAnimationsModule,
    RecentlyViewedComponent
  ]
})

export class HomeModule { }

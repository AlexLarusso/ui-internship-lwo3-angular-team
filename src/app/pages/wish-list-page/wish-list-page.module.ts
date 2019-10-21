import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollService } from '../../shared/services/scroll.service';
import { SharedModule } from '../../shared/shared.module';

import { WishListComponent } from '../../components/wish-list/wish-list.component';

@NgModule({
  declarations: [
    WishListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [
    ScrollService,
  ],
  exports: [
    WishListComponent
  ]
})

export class WishListPageModule { }

import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { LoaderService } from '../services/loader.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements AfterContentInit, OnDestroy {
  public isLoading = true;
  public bulletsArray = new Array(12).fill('');
  public loaderSub: Subscription;

  constructor(private loaderService: LoaderService) { }

  public ngAfterContentInit() {
    this.loaderSub = this.loaderService.isLoading
      .subscribe(result => this.isLoading = result);
  }

  public ngOnDestroy(): void { }
}

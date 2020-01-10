import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ScrollService } from './shared/services';
import { ProductsFacade } from './store/products/products.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public isHomePage: boolean;
  public routerSub: Subscription;

  constructor(
    private scrollService: ScrollService,
    private router: Router,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.productsFacade.loadProducts();
    window.onbeforeunload = () => window.scrollTo(0, 0);

    this.routerSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollService.moveTo({ title: 'app-header' });
        this.isHomePage = window.location.pathname === '/home';
      });
  }

  public ngOnDestroy(): void { }
}

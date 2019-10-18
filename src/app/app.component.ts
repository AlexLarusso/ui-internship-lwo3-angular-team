import {
  Component, AfterViewInit, QueryList, ViewChildren, OnInit, OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ScrollService } from './shared/services/scroll.service';
import { ScrollAnchorDirective } from './shared/directives/scroll-anchor.directive';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy  {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService, private router: Router) {
  }

  public isHomePage: boolean;
  public routerSub: Subscription;

  public ngOnInit(): void {
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.isHomePage = window.location.pathname === '/home';
    });
  }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference));
  }

  public ngOnDestroy() {}
}

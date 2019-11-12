import { environment } from './../environments/environment';
import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.store';
import { SetToWishList } from './store/actions/wish-list.actions';

import { ScrollService } from './shared/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private scrollService: ScrollService,
    private router: Router
  ) { }

  public isHomePage: boolean;
  public routerSub: Subscription;

  public ngOnInit(): void {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.store.dispatch(new SetToWishList(localStorageLiked));
    }

    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.scrollService.moveTo({ title: 'app-header' });
      this.isHomePage = window.location.pathname === '/home';
    });
  }

  public ngOnDestroy(): void { }
}

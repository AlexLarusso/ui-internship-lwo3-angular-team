import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState } from 'src/app/store/app.store';
import { getLoadingStatus } from 'src/app/store/selectors/loader.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  public bulletsArray = new Array(12).fill('');
  public loader$: Observable<boolean>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit() {
    this.loader$ = this.store.select(getLoadingStatus);
  }
}

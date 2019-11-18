import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState } from 'src/app/store/app.store';
import { Increment, Decrement, Reset } from 'src/app/store/actions/counter.actions';
import { getCount } from 'src/app/store/selectors/counter.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  styleUrls: ['./counter.scss'],
})
export class CounterComponent implements OnInit {
  public count$: Observable<number>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.count$ = this.store.select(getCount);
  }

  public increment(): void {
    this.store.dispatch(new Increment());
  }

  public decrement(): void {
    this.store.dispatch(new Decrement());
  }

  public reset(): void {
    this.store.dispatch(new Reset());
  }
}

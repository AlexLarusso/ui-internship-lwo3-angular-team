import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as counterActions from '../../store/actions/counter.actions';
import * as fromApp from '../../store/reducers/app.reducer';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  styleUrls: ['./counter.scss'],
})
export class CounterComponent implements OnInit {
  public count$: Observable<number>;

  constructor(private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.count$ = this.store.select('counter').pipe(map(counter => counter.count));
  }

  public increment() {
    this.store.dispatch(new counterActions.Increment());
  }

  public decrement() {
    this.store.dispatch(new counterActions.Decrement());
  }

  public reset() {
    this.store.dispatch(new counterActions.Reset());
  }
}

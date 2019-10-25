import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { of, Subscription, Observable } from 'rxjs';
import { delay, switchMap, mergeAll } from 'rxjs/operators';

import { IAppState } from 'src/app/store/app.store';
import { IncrementQuantity, DecrementQuantity } from 'src/app/store/actions/product-options.actions';
import { getProductQuantity } from 'src/app/store/selectors/product-options.selector';

@AutoUnsubscribe()
@Component({
  selector: 'app-select-number',
  templateUrl: 'select-number.html',
  styleUrls: ['select-number.scss']
})
export class SelectNumberComponent implements OnInit, OnDestroy {
  @Input() maxNumber: number;

  public minusIcon: IconDefinition = faMinusCircle;
  public plusIcon: IconDefinition = faPlusCircle;
  public valueSub: Subscription;
  public value: number;
  public isValuelimit = false;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.valueSub = this.store.select(getProductQuantity)
      .subscribe(data => this.value = data);
  }

  public ngOnDestroy(): void { }

  public increment(): void {
    if (this.isWithinValueLimit(this.value + 1)) {
      this.store.dispatch(new IncrementQuantity());
    }
  }

  public decrement(): void {
    if (this.isWithinValueLimit(this.value - 1)) {
      this.store.dispatch(new DecrementQuantity());
    }
  }

  private isWithinValueLimit(value: number): boolean {
    if (value > 0 && value <= this.maxNumber) {
      return true;
    }
    this.toggleLimit();
  }

  private toggleLimit() {
    this.isValuelimit = true;
    of(false).pipe(delay(500))
      .subscribe(val => this.isValuelimit = val);
  }
}

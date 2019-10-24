import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { IncrementQuantity, DecrementQuantity } from 'src/app/store/actions/product-options.actions';
import { getProductQuantity } from 'src/app/store/selectors/product-options.selector';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-select-number',
  templateUrl: 'select-number.html',
  styleUrls: ['select-number.scss']
})
export class SelectNumberComponent implements OnInit {
  @Input() maxNumber: number;

  @Output() numberSelect: EventEmitter<number> = new EventEmitter<number>();

  public minusIcon: IconDefinition = faMinusCircle;
  public plusIcon: IconDefinition = faPlusCircle;
  public value: number;
  public isValuelimit = false;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.store.select(getProductQuantity)
      .subscribe(data => this.value = data);
  }

  public increment(): void {
    this.isWithinValueLimit(this.value + 1)
      && this.store.dispatch(new IncrementQuantity());
  }

  public decrement(): void {
    this.isWithinValueLimit(this.value - 1)
      && this.store.dispatch(new DecrementQuantity());
  }

  private isWithinValueLimit(value: number): boolean {
    if (value > 0 && value <= this.maxNumber) {
      return true;
    }

    this.isValuelimit = true;
    of(false).pipe(delay(500))
      .subscribe(value => this.isValuelimit = value);
  }
}

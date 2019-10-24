import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { Increment, Decrement } from 'src/app/store/actions/counter.actions';
import { getCount } from 'src/app/store/selectors/counter.selectors';
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

  public minusIcon: IconDefinition;
  public plusIcon: IconDefinition;
  public value: number;
  public isValuelimit = false;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.minusIcon = faMinusCircle;
    this.plusIcon = faPlusCircle;
    this.store.select(getCount).subscribe(data => this.value = data);
  }

  public increment(): void {
    this.isWithinValueLimit(this.value + 1)
      && this.store.dispatch(new Increment());
  }

  public decrement(): void {
    this.isWithinValueLimit(this.value - 1)
      && this.store.dispatch(new Decrement());
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

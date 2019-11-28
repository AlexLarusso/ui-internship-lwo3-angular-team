import {
  Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import { of, Observable, merge } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IconDefinition, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.html',
  styleUrls: ['./select-quantity.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuantityComponent implements OnInit {
  @Input() public maxNumber: number;
  @Input() public startNumber = 1;

  @Output() public quantityChanged: EventEmitter<number>
    = new EventEmitter<number>();

  public isValueLimit$: Observable<boolean>;
  public iconIncrement: IconDefinition = faPlusSquare;
  public iconDecrement: IconDefinition = faMinusSquare;
  public increment = 1;
  public decrement = -1;
  public value: number;
  public toggleLimitDelayValue = 500;

  public ngOnInit(): void {
    this.value = this.startNumber;
    this.isValueLimit$ = of(false);
  }

  public onChange(count: number): void {
    const newValue = this.value + count;

    if (newValue && newValue <= this.maxNumber) {
      this.value = newValue;
      this.quantityChanged.next(newValue);
    } else {
      this.toggleLimit();
    }
  }

  private toggleLimit(): void {
    this.isValueLimit$ = merge(
      of(true),
      of(false).pipe(delay(this.toggleLimitDelayValue)),
    );
  }
}

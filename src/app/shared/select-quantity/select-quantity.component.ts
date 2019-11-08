import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IconDefinition, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.html',
  styleUrls: ['./select-quantity.scss']
})
export class SelectQuantityComponent implements OnInit {
  @Input() public maxNumber: number;
  @Input() public startNumber = 1;

  @Output() public quantityChanged: EventEmitter<number>
    = new EventEmitter<number>();

  public isValueLimit = false;
  public iconIncrement: IconDefinition = faPlusSquare;
  public iconDecrement: IconDefinition = faMinusSquare;
  public increment = 1;
  public decrement = -1;
  public value: number;
  public toggleLimitDelayValue = 500;

  public ngOnInit(): void {
    this.value = this.startNumber;
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
    this.isValueLimit = true;
    of(false).pipe(delay(this.toggleLimitDelayValue))
      .subscribe(val => this.isValueLimit = val);
  }
}

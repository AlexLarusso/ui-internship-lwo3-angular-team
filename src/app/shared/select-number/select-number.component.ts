import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  public increment = 1;
  public decrement = -1;

  public ngOnInit(): void {
    this.minusIcon = faMinusCircle;
    this.plusIcon = faPlusCircle;
    this.value = 1;
  }

  public onClick(index: number): void {
    const nextNum = this.value + index;

    if (nextNum <= this.maxNumber && nextNum > 0) {
      this.value = nextNum;
      this.numberSelect.emit(nextNum);
      this.isValuelimit = false;
    } else {
      this.isValuelimit = true;
      of(false).pipe(delay(500))
        .subscribe(value => this.isValuelimit = value);
    }
  }
}
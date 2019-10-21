import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-number',
  templateUrl: 'select-number.html',
  styleUrls: ['select-number.scss']
})
export class SelectNumberComponent {
  @Input() maxNumber: number;
  @Output() numberSelect: EventEmitter<number> = new EventEmitter<number>();

  public minusIcon: IconDefinition;
  public plusIcon: IconDefinition;
  public value: number;
  public valueLimit: boolean;
  public increment = 1;
  public decrement = -1;

  constructor() { }

  ngOnInit() {
    this.minusIcon = faMinusCircle;
    this.plusIcon = faPlusCircle;
    this.value = 1;
    this.valueLimit = false;
  }

  onClick(i: number) {
    const nextNum = this.value + i
    if (nextNum <= this.maxNumber && nextNum > 0) {
        this.value = nextNum;
        this.numberSelect.emit(nextNum);
        this.valueLimit = false;
    } else {
        this.valueLimit = true;
        setTimeout(() => {
          this.valueLimit = false;
        }, 500);
    }
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle, faMinusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-number',
  templateUrl: 'select-number.html',
  styleUrls: ['select-number.scss']
})
export class SelectNumberComponent {
  @Input() private maxNumber: number;

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
        this.valueLimit = false;
    } else {
      this.valueLimit = true;
      setTimeout(() => {
        this.valueLimit = false;
      }, 500);
    }
    
  }
}
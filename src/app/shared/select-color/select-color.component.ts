import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.html',
  styleUrls: ['./select-color.scss']
})
export class SelectColorComponent {
  @Input() public colors: Array<number>;
  @Output() colorSelect: EventEmitter<number> = new EventEmitter<number>();
  selectedColorID: number;

  constructor() { }

  ngOnInit() {
    this.selectedColorID = 0;
   }

  onSelect(i: number) {
    this.selectedColorID = i;
    this.colorSelect.emit(this.colors[this.selectedColorID]);
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.html',
  styleUrls: ['./select-color.scss']
})
export class SelectColorComponent {
  @Input() public colors: Array<number>;
  @Output() colorSelect: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onSelect(i: number) {
    this.colorSelect.emit(i);
  }
}
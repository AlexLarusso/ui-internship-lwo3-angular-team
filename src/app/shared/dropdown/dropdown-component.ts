import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChildren, ViewChild } from '@angular/core';
import { faCaretDown, faCaretUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<string>;
  @Input() default: string;
  @Output() itemSelect: EventEmitter<number> = new EventEmitter<number>();
  
  private iconUp: IconDefinition;
  private iconDown: IconDefinition;
  private selected: string;
  private expanded: boolean;

  constructor() { }

  ngOnInit() {
    this.expanded = false;
    this.selected = this.default 
      ? this.default
      : this.options[0];
    this.iconUp = faCaretUp;
    this.iconDown = faCaretDown;
  }

  toggleDropdown() {
    this.expanded = !this.expanded;
  }

  onBlur() {
    this.expanded = false;
  }

  onItemSelect(i: number) {
    this.selected = this.options[i];
    this.itemSelect.emit(i);
  }
}
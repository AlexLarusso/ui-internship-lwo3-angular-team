import { Component, OnInit, Input,
  Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';
import { faCaretDown, faCaretUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<string>;
  @Input() default: string;

  @Output() itemSelect: EventEmitter<string> = new EventEmitter<string>();

  public iconUp: IconDefinition;
  public iconDown: IconDefinition;
  public expanded: boolean;

  public selected: string;

  public ngOnInit(): void {
    this.expanded = false;
    this.selected = this.default
      ? this.default
      : this.options[0];
    this.iconUp = faCaretUp;
    this.iconDown = faCaretDown;
  }

  public toggleDropdown(): void {
    this.expanded = !this.expanded;
  }

  public onBlur(): void {
    this.expanded = false;
  }

  public onItemSelect(index: number): void {
    this.selected = this.options[index];
    this.itemSelect.emit(this.selected);
  }
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.html',
  styleUrls: ['./select-color.scss']
})
export class SelectColorComponent implements OnInit {
  @Input() colors: Array<number>;

  @Output() colorSelect: EventEmitter<number> = new EventEmitter<number>();

  public selectedColorID: number;

  public ngOnInit(): void {
    this.selectedColorID = 0;
  }

   public onSelect(i: number): void {
    this.selectedColorID = i;
    this.colorSelect.emit(this.colors[this.selectedColorID]);
  }
}

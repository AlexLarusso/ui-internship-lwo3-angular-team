import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';
import { SelectColor } from 'src/app/store/actions/product-options.actions';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.html',
  styleUrls: ['./select-color.scss']
})
export class SelectColorComponent implements OnInit {
  @Input() colors: Array<string>;

  public selectedColor: string;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.store.select(getProductSelectedColor)
      .subscribe(color => this.selectedColor = color);
  }

   public onSelect(color: string): void {
    this.store.dispatch(new SelectColor(color));
  }
}

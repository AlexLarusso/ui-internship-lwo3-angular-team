import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/store/app.store';
import { SelectSize } from 'src/app/store/actions/product-options.actions';

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.html',
  styleUrls: ['./select-size.scss']
})
export class SelectSizeComponent {
  @Input() public sizes: Array<string>;

  constructor(private store: Store<IAppState>) { }


  public handleSizeSelect(size: string): void {
    this.store.dispatch(new SelectSize(size));
  }
}

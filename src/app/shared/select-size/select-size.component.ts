import { Component, Input, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { IAppState } from 'src/app/store/app.store';
import { SelectSize } from 'src/app/store/actions/product-options.actions';

@AutoUnsubscribe()
@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.html',
  styleUrls: ['./select-size.scss']
})
export class SelectSizeComponent implements OnDestroy {
  @Input() public sizes: Array<string>;

  constructor(private store: Store<IAppState>) { }

  public ngOnDestroy() { }

  public handleSizeSelect(size: string): void {
    this.store.dispatch(new SelectSize(size));
  }
}

import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IAppState } from 'src/app/store/app.store';

import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';
import { SelectColor } from 'src/app/store/actions/product-options.actions';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.html',
  styleUrls: ['./select-color.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectColorComponent implements OnInit, OnDestroy {
  @Input() public colors: Array<string>;

  public selectedColor: string;
  public selectedColorSub: Subscription;

  constructor(private readonly store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.selectedColorSub = this.store.select(getProductSelectedColor)
      .subscribe(color => this.selectedColor = color);
  }

  public ngOnDestroy(): void { }

   public onSelect(color: string): void {
    this.store.dispatch(new SelectColor(color));
  }
}

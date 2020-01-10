import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ProductOptionsFacade } from 'src/app/store/product-options/product-options.facade';

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.html',
  styleUrls: ['./select-size.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectSizeComponent {
  @Input() public sizes: Array<string>;

  constructor(public productsOptionsFacade: ProductOptionsFacade) { }

  public handleSizeSelect(size: string): void {
    this.productsOptionsFacade.onSelectSize(size);
  }
}

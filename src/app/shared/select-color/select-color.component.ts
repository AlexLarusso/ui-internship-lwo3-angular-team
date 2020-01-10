import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ProductOptionsFacade } from 'src/app/store/product-options/product-options.facade';

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

  constructor(public productOptionsFacade: ProductOptionsFacade) { }

  public ngOnInit(): void {
    this.selectedColorSub = this.productOptionsFacade.productSelectedColor$
      .subscribe(color => this.selectedColor = color);
  }

  public ngOnDestroy(): void { }

   public onSelect(color: string): void {
    this.productOptionsFacade.onSelectColor(color);
  }
}

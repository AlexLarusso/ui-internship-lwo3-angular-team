import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor], app-line-bar, app-footer'
})
export class ScrollAnchorDirective {
  public elementReference: ElementRef;

  constructor(elr: ElementRef) {
    this.elementReference = elr;
  }
}

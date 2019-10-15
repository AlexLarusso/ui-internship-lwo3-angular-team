import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor], app-header, app-footer'
})
export class ScrollAnchorDirective {
  public elementReference: ElementRef;
  
  constructor(elr: ElementRef) {
    this.elementReference = elr;
  }
}

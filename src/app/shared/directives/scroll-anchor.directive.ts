import { Directive, ElementRef, OnDestroy, AfterContentInit } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ScrollService } from '../services';

@AutoUnsubscribe()
@Directive({
  selector: '[appScrollAnchor]'
})
export class ScrollAnchorDirective implements OnDestroy, AfterContentInit {

  constructor(
    private elementReference: ElementRef,
    private scrollService: ScrollService
  ) { }

  public ngAfterContentInit(): void {
    this.scrollService.addAnchor(this.elementReference);
  }

  public ngOnDestroy(): void {
    this.scrollService.removeAnchor(this.elementReference);
  }
}

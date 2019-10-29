import { Directive, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ScrollService } from '../services';

@AutoUnsubscribe()
@Directive({
  selector: '[appScrollAnchor]'
})
export class ScrollAnchorDirective implements OnDestroy, AfterViewInit {

  constructor(
    private elementReference: ElementRef,
    private scrollService: ScrollService
  ) { }

  public ngAfterViewInit(): void {
    this.scrollService.addAnchor(this.elementReference);
  }

  public ngOnDestroy(): void {
    this.scrollService.removeAnchor(this.elementReference);
  }
}

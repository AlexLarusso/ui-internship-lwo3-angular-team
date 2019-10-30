import { Directive, Renderer2, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';


@AutoUnsubscribe()
@Directive({
  selector: '[appModalOpen]'
})
export class ModalOpenDirective implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
  }
}

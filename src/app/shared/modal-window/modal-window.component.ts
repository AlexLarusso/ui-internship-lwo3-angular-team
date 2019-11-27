import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { takeWhile } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

import { ToastrMessage } from '../../app.enum';
import { ModalService } from '../services/modal-service';

@AutoUnsubscribe()
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss']
})

export class ModalComponent implements OnInit, OnDestroy {
  constructor(
    private readonly modalService: ModalService,
    private readonly el: ElementRef,
    private readonly toastrService: ToastrService,
    private readonly renderer: Renderer2
  ) { }

  @Input() public modalName: string;

  public modalWindowSub: Subscription;

  private element: any;

  public ngOnInit(): void {
    this.element = this.el.nativeElement;

    if (!this.modalName) {
      this.toastrService.warning(ToastrMessage.invalidModal);

      return;
    }

    this.renderer.appendChild(document.body, this.element);

    this.modalWindowSub = fromEvent(this.element, 'click')
      .subscribe((el: any) => {
        if (el.target.className === 'modal-window') {
          this.modalService.isModalOpened = {
            login: false, signUp: false, userProfile: false
          };
        }
      });
  }

  public ngOnDestroy(): void {
    this.modalService.close(this.modalName);
  }
}

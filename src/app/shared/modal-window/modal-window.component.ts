import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { takeWhile } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { ToastrMessage } from '../../app.enum';
import { ModalService } from '../services/modal-service';

@AutoUnsubscribe()
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss']
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalName: string;

  private element: any;

  constructor(
    private readonly modalService: ModalService,
    private readonly el: ElementRef,
    private readonly toastrService: ToastrService,
    private readonly renderer: Renderer2
  ) { }

public ngOnInit(): void {
  this.element = this.el.nativeElement;

  if (!this.modalName) {
    this.toastrService.warning(ToastrMessage.invalidModal);
    return;
  }

  this.renderer.appendChild(document.body, this.element);

  fromEvent(this.element, 'click')
    .pipe(
      takeWhile((el: any) => el.target.className === 'modal-window'))
    .subscribe(() => {
      this.modalService.isModalOpened.login = false;
      this.modalService.isModalOpened.signUp = false;
    });
}

public ngOnDestroy(): void {
  this.modalService.close(this.modalName);
  }
}

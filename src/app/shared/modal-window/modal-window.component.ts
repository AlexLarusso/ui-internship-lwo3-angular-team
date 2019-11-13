import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../services/modal-service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss']
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        document.body.appendChild(this.element);

        this.element.addEventListener('click', e => {
            if (e.target.className === 'modal-window') {
                this.modalService.isLoginModalOpen = false;
                this.modalService.isSignUpModalOpen = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.modalService.close(this.id);
    }
}

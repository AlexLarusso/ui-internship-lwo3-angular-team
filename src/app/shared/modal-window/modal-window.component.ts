import { Component, ElementRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

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
        console.log('modal component init');
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        console.log(this.id);
        document.body.appendChild(this.element);

        this.element.addEventListener('click', e => {
            if (e.target.className === 'modal-window') {
                this.modalService.isLoginModalOpen = false;
                this.modalService.isSignUpModalOpen = false;
            }
        });
        this.modalService.add(this.id);
        // console.log(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        // this.element.remove();
    }

    // open(): void {
    //     // this.element.style.display = 'block';
    //     document.body.classList.add('modal-window__open');
    // }

    // close(): void {
    //     // this.element.style.display = 'none';
    //     document.body.classList.remove('modal-window__open');
    // }
}

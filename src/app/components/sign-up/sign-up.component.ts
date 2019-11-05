import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { ModalService } from '../../shared/services/modal-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})

export class SignUpComponent implements OnInit {
  user: User = new User();

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}

  onSubmit(): void {
    console.log(this.user);
    this.modalService.close('sign-up');
  }
 }

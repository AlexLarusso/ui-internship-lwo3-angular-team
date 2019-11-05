import { Component } from '@angular/core';
import {
  faFacebookF, faTwitter, faGoogle
} from '@fortawesome/free-brands-svg-icons';

import { ModalService } from '../../../shared/services/modal-service';

@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.html',
  styleUrls: ['./line-bar.scss']
})
export class LineBarComponent {
  constructor(
    private modalService: ModalService) {
  }

  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;

  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

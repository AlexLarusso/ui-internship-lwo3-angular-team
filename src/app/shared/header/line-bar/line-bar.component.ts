import { Component } from '@angular/core';

import {
  faFacebookF, faTwitter, faGoogle
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.html',
  styleUrls: ['./line-bar.scss']
})
export class LineBarComponent {
  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;

  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';
}

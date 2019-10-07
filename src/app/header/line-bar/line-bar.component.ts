import { Component, OnInit } from '@angular/core';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.component.html',
  styleUrls: ['./line-bar.component.scss']
})
export class LineBarComponent implements OnInit {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGoogle = faGoogle;

  constructor() { }

  ngOnInit() {
  }

}

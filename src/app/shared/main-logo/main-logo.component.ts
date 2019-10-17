import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.html',
  styleUrls: ['./main-logo.scss']
})
export class MainLogoComponent {
  @Input() public logoColor: string;
}

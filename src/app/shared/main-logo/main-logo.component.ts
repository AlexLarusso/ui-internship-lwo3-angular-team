import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss']
})
export class MainLogoComponent {
  @Input() public logoColor: string;
}

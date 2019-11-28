import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.html',
  styleUrls: ['./main-logo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MainLogoComponent {
  @Input() public logoColor: string;
}

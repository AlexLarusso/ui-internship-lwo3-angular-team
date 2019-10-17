import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})

export class ButtonComponent {
  @Input() public buttonClass: string;
  @Input() public disabled: boolean;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonComponent {
  @Input() public buttonClass: string;
  @Input() public isDisabled: boolean;
}

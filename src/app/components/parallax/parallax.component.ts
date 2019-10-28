import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.html',
  styleUrls: ['./parallax.scss']
})
export class ParallaxComponent {
  @Input() public parallaxClass: string;
}

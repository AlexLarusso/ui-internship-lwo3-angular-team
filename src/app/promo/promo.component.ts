import { Component } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent {
  public promoText = `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus
    suscipit tortor eget felis porttitor volutpat.`;
}

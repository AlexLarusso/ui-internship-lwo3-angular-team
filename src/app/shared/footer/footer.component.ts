import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  public links = ['FAQ', 'support', 'terms and conditions'];
  public shoppingCategories = [
    { title: 'shopping cart', url: '/shopping-cart'},
    { title: 'spring', url: 'category/spring'},
    { title: 'summer', url: 'category/summer'},
    { title: 'autumn', url: 'category/autumn'},
    { title: 'winter', url: 'category/winter'}
  ];
}

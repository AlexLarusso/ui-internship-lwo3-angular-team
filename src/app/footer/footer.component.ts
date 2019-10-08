import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public links = ['Home', 'Sign in', 'Register', 'FAQ', 'Support', 'Terms and Conditions'];
  public shoppingCategories = ['Shopping Cart', 'Winter', 'Spring', 'Summer', 'Fall', 'Collection'];
}

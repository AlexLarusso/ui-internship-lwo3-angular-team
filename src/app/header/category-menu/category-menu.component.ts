import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})

export class CategoryMenuComponent {
  public categories = ['Woman', 'Man', 'Collection'];
  public seasons = ['Spring', 'Summer', 'Fail', 'Winter'];
}

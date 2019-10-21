import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.scss']
})

export class CategoryMenuComponent {
  public categories = ['Woman', 'Man', 'Collection'];
  public seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
}

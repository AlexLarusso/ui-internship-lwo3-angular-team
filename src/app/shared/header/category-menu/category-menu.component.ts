import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.scss']
})

export class CategoryMenuComponent {
  public genders = [
    { title: 'women', url: 'category/women' },
    { title: 'men', url: 'category/men' },
    { title: 'collection', url: 'category/collection' }
  ];
  public seasons = [
    { title: 'winter', url: 'category/winter' },
    { title: 'spring', url: 'category/spring' },
    { title: 'summer', url: 'category/summer' },
    { title: 'fall', url: 'category/fall' }
  ];
}

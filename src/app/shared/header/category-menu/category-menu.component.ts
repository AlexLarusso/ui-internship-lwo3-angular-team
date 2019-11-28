import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoryMenuComponent {
  public genders = [
    { title: 'women', url: 'category/women' },
    { title: 'men', url: 'category/men' },
    { title: 'collection', url: 'category/collection' }
  ];

  public seasons = [
    { title: 'spring', url: 'category/spring' },
    { title: 'summer', url: 'category/summer' },
    { title: 'autumn', url: 'category/autumn' },
    { title: 'winter', url: 'category/winter' }
  ];
}

import { Component } from '@angular/core';
import { IAppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { FilterBySeason, FilterByGender } from 'src/app/store/actions/products.action';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.scss']
})

export class CategoryMenuComponent {
  constructor(private store: Store<IAppState>) { }

  public genders = [
    { title: 'women', url: 'category/women' },
    { title: 'men', url: 'category/men' },
    { title: 'collection', url: 'category/collection' },
    {}

  ];

  public seasons = [
    { title: 'spring', url: 'category/spring' },
    { title: 'summer', url: 'category/summer' },
    { title: 'autumn', url: 'category/autumn' },
    { title: 'winter', url: 'category/winter' }
  ];

  public filterProducts(filterCategory: string): void {
    filterCategory === 'women' || filterCategory === 'men' ?
      this.store.dispatch(new FilterByGender(filterCategory)) :
      this.store.dispatch(new FilterBySeason(filterCategory));
  }
}

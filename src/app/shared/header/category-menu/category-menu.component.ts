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
    { title: 'collection', url: 'category/collection' }
  ];

  public seasons = [
    { title: 'winter', url: 'category/winter' },
    { title: 'spring', url: 'category/spring' },
    { title: 'summer', url: 'category/summer' },
    { title: 'autumn', url: 'category/autumn' }
  ];

<<<<<<< HEAD
  public filterProducts(filterCategory): void {
=======
  public filterProducts(filterCategory: string): void {
>>>>>>> 61b7c429cb572ec8885240970a2ada46e19a33d7
    filterCategory === 'women' || filterCategory === 'men' ?
      this.store.dispatch(new FilterByGender(filterCategory)) :
      this.store.dispatch(new FilterBySeason(filterCategory));
  }
}

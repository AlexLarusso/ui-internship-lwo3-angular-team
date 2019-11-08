import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.scss']
})

export class CategoryMenuComponent {
  public genders = [
    {title: 'women', url: '/women'},
    {title: 'men', url: '/men'},
    {title: 'collection', url: '/collection'}
  ];
  public seasons = [
    {title: 'winter', url: '/winter'},
    {title: 'spring', url: '/spring'},
    {title: 'summer', url: '/summer'},
    {title: 'fall', url: '/fall'}
  ];
}

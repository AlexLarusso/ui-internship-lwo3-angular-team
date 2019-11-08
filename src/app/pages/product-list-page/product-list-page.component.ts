
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.html',
})

export class ProductListPageComponent implements OnInit {
  public currentPath: string;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.currentPath = this.route.snapshot.url[0].path;
  }
}

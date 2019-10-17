import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.html',
  styleUrls: ['./similar-products.scss']
})
export class SimilarProductsComponent implements OnInit {
  public category = 'similar';

  constructor() { }

 public ngOnInit() {

  }
}

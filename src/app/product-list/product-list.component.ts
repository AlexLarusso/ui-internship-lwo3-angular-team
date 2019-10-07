import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productData: Product[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData().subscribe((data: Product[]) => this.productData = data);
  }

}

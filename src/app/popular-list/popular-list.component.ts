import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';

@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.scss']
})
export class PopularListComponent implements OnInit {
  productData: Product[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData().subscribe((data: Product[]) => this.productData = data);
  }
}

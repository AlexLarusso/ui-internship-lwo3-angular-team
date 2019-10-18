import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductResolver } from '../../shared/services/product.resolver';
import { IProduct } from '../../interfaces/product.interface';

const MOCKDATA = {
  "productName": "ANSWEAR - BLOUSE",
  "description": "The shirt from the Answear collection. The model is made of patterned fabric.\n      - Free style.\n      - Lowered shoulder line.\n      - Unfastening sleeves.\n      - Fastens on buttons.\n      - Thin inelastic fabric.\n      - Armpit width: 55 cm.\n      - Length: 80.5 cm.\n      - Sleeve length (from collar): 70.5 cm.\n      - The parameters are specified for size: S / M.\n\n      Pattern: patterned\n      Sleeve: long\n      Casual: casual\n      Composition: 5% Cotton, 95% Polyester",
  "brand": "Answear",
  "sizes": ["s", "m", "l", "xl"],
  "colors": ["#000000", "#fffff", "#b32d24"],
  "images": [
    {
      "value": "#000000",
      "url": ["./assets/server-data/images/blouse_1_1.jpg",
        "./assets/server-data/images/blouse_1_2.jpg",
        "./assets/server-data/images/blouse_1_3.jpg",
        "./assets/server-data/images/blouse_1_4.jpg"]
    },
    {
      "value": "#fffff",
      "url": ["./assets/server-data/images/blouse_2_1.jpg",
        "./assets/server-data/images/blouse_2_2.jpg",
        "./assets/server-data/images/blouse_2_3.jpg",
        "./assets/server-data/images/blouse_2_4.jpg"]
    },
    {
      "value": "#b32d24",
      "url": ["./assets/server-data/images/blouse_3_1.jpg",
        "./assets/server-data/images/blouse_3_2.jpg",
        "./assets/server-data/images/blouse_3_3.jpg",
        "./assets/server-data/images/blouse_3_4.jpg"]
    }
  ],
  "video": "",
  "category": "blouse",
  "sex": "female",
  "season": ["spring", "fall", "summer", "winter"],
  "quantity": 10,
  "price": 799
};

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  providers: [ProductResolver]
})

export class ProductDetailsPageComponent {

  constructor(private route: ActivatedRoute) { }

  public id = Number(this.route.snapshot.paramMap.get('id'));

  private product: IProduct;
  private getData(id: number) {
    //TODO
    return JSON.parse(JSON.stringify(MOCKDATA));
  }

  public ngOnInit(): void {
    this.product = this.getData(this.id);
  }

}

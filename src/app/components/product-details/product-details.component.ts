import { Component, OnInit, Input } from "@angular/core";
import { IProductDetails } from "src/app/interfaces/product-details.interface";
import { IProductOptions } from "src/app/interfaces/product-options.interface";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.html",
  styleUrls: ["./product-details.scss"]
})
export class ProductDetailsComponent implements OnInit {
  @Input() private productDetails: IProductDetails;

  public productOptions: IProductOptions;
  public productDescription: {
    title: string;
    text: string;
  }[] = [];
  public currentCurrency = "UAH";

  constructor() {}

  ngOnInit() {
    console.log(this.productDetails.description.detail);
    
    this.addDescriptionNote('Detail',
      this.productDetails.description.detail);
    this.addDescriptionNote('Style',
      this.productDetails.description.style);
    this.addDescriptionNote('Delivery',
      this.productDetails.description.delivery);
  }

  private addDescriptionNote(title: string, text: string) {
    this.productDescription.push({
      title: title,
      text: text
    });
  }
}

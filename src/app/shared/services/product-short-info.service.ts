import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { map } from "rxjs/operators";
import { IProductShortInfo } from "../../interfaces/product-short-info.interface";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root"
})
export class ProductShortInfoService {
  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {}

  public getShortInfo(category = "all"): Observable<Array<IProductShortInfo>> {
    switch (category) {
      case "all":
        return this.httpService.getData().pipe(
          map(data =>
            data.map(item => ({
              title: item.productName,
              imgUrl: item.images[0].url[0],
              price: item.price + " uah",
              id: item.id
            }))
          )
        );
      case "allrecentItems":
        console.log("it works");
        return this.httpService.getData().pipe(
          map(data =>
            data
              .filter(el =>
                this.localStorageService.recentlyViewed.includes(el.id))
              .map(item => ({
                title: item.productName,
                imgUrl: item.images[0].url[0],
                price: item.price + " uah",
                id: item.id
              }))
          )
        );
    }
  }
}

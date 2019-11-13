import { IProductOptions } from './product-options.interface';
import { IProductDescription } from './product-description.interface';

export interface IProductDetails {
  title: string;
  price: number;
  brand: string;
  category: string | Array<string>;
  gender: string;
  season: string | Array<string>;
  options: IProductOptions;
  description: IProductDescription;
  productId: string;
}

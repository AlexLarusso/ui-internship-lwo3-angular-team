import { IProductOptions } from './product-options.interface';
import { IProductDescription } from './product-description.interface';

export interface IProductDetails {
  title: string,
  price: number,
  options: IProductOptions,
  description: IProductDescription
}
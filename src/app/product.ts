import { IProductImage } from './product-image';

export interface IProduct {
  productName: string;
  description: string;
  brand: string;
  sizes: Array<string>;
  colors: Array<number>;
  images: Array<IProductImage>;
  video: string;
  category: string;
  sex: string;
  season: Array<string>;
  quantity: number;
  price: number;
  id: number;
}

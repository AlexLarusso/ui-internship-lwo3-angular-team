import { IProductImage } from './product-image.interface';

export interface IProduct {
  productName: string;
  description: string;
  brand: string;
  sizes: Array<string>;
  colors: Array<string>;
  images: Array<IProductImage>;
  video: string;
  category: string;
  gender: string;
  seasons: Array<string>;
  quantity: number;
  price: number;
  _id: string;
  status: string;
  sellCount: number;
  createdAt: Date;
  updatedAt: Date;
}

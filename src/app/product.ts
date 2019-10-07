export interface Product {
  productName: string;
  description: string;
  brand: string;
  sizes: string[];
  colors: number[];
  images: [
    {
      value: number,
      url: string[]
    }
  ];
  video: string;
  category: string;
  sex: string;
  season: string[];
  quantity: number;
  price: number;
}

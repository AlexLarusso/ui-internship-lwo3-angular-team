export interface IReview {
  productId: string;
  createdBy: string;
  message: string;
  rating: number;
  createdAt?: Date;
}

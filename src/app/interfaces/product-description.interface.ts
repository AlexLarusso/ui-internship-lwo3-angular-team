export interface IProductDescription {
  brand: string,
  category: string,
  sex: string,
  detail: string | Array<string>,
  delivery?: string,
  season: Array<string>,
}
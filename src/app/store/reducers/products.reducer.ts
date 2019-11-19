import {
  SetProducts,  LoadProducts, ProductsActions, FilterByGender, FilterBySeason, SetProductImages
} from '../actions/products.action';
import { IProduct, ICloudinaryImage } from '../../interfaces';
import { URLs } from 'src/app/app.enum';

export interface IState {
  products: Array<IProduct>;
  load: boolean;
  filteredProducts: Array<IProduct>;
}

export const initialState: IState = {
  products: [],
  load: false,
  filteredProducts: []
};

export function productsReducer(state = initialState, action: ProductsActions): IState {
  const { type, payload } = action;
  const currentItems = state.products;

  switch (type) {
    case LoadProducts.TYPE:
      return {
        ...state,
        load: true
      };

    case SetProducts.TYPE: {
      const data = payload;
      const productsWithImages = data.products.map(product => {
        const productImages = product.images
          .reduce((prodImages, image) => {
            const isColorAlreadyExist = prodImages.some(el => el.value === image.productColor);

            if (isColorAlreadyExist) {
              prodImages.forEach(el => {
                if (el.value === image.productColor) {
                  el.url.push(`${URLs.productImage}/${image.claudinaryId}`);
                }
              });
            } else {
              prodImages.push({
                value: image.productColor,
                url: [`${URLs.productImage}/${image.claudinaryId}`]
              });
            }

            return prodImages;
          }, []);

        console.log(productImages);

        return {
          ...product,
          images: [...productImages]
        };
      });

      return {
        ...state,
        products: [...productsWithImages]
      };
    }

    case FilterByGender.TYPE:
      const filteredByGenderItems = currentItems.filter(item => item.gender === payload);

      return {
        ...state,
        filteredProducts: [...filteredByGenderItems]
      };

    case FilterBySeason.TYPE:
      const filteredBySeasonItems = currentItems.filter(item => item.seasons.includes(payload));

      return {
        ...state,
        filteredProducts: [...filteredBySeasonItems]
      };

    default:
      return state;
  }
}

import {
  SetProducts,  LoadProducts, ProductsActions, FilterByGender, FilterBySeason, SetProductImages
} from '../actions/products.action';
import { IProduct, ICloudinaryImage } from '../../interfaces';
import { URLs } from 'src/app/app.enum';

export interface IState {
  products: Array<IProduct>;
  productImages: Array<ICloudinaryImage>;
  load: boolean;
  filteredProducts: Array<IProduct>;
}

export const initialState: IState = {
  products: [],
  productImages: [],
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
      const [products, images] = [payload, state.productImages];
      const productsWithImages = products.map(product => {
        const productImages = images
          .filter(image => image.productId === product._id)
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


    case SetProductImages.TYPE: {
      return {
        ...state,
        productImages: [...payload]
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

import {
  SetProducts,  LoadProducts, ProductsActions, SetFilterCriteria, SearchByProductName
} from '../actions/products.action';
import { IProduct, IFilterCriteria } from '../../interfaces';
import { URLs } from 'src/app/app.enum';

export interface IState {
  products: Array<IProduct>;
  load: boolean;
  filterCriteria: IFilterCriteria;
  searchInput: string;
}

export const initialState: IState = {
  products: [],
  load: false,
  filterCriteria: null,
  searchInput: null
};

export function productsReducer(state = initialState, action: ProductsActions): IState {
  const { type, payload } = action;

  switch (type) {
    case LoadProducts.TYPE:
      return {
        ...state,
        load: true
      };

    case SetProducts.TYPE: {
      const data = payload;
      const productsWithSortedImages = data.products.map(product => {
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

        return {
          ...product,
          images: [...productImages]
        };
      });

      return {
        ...state,
        products: [...productsWithSortedImages]
      };
    }

    case SetFilterCriteria.TYPE: {
      const criteriaName = payload === 'women' || payload === 'men'
        ? 'gender'
        : 'seasons';

      return {
        ...state,
        filterCriteria: {
          criteriaName,
          value: payload
        }
      };
    }

    case SearchByProductName.TYPE: {
      return {
        ...state,
        searchInput: payload
      };
    }

    default:
      return state;
  }
}

import { WishListActions, WishListActionTypes } from '../actions/wish-list.actions';

export interface State {
  likedProducts: Array<string>;
}

const initialState = {
  likedProducts: []
};

export function wishListReducer(state = initialState, action: WishListActions): State {
  const likedProductsArray = state.likedProducts;

  switch (action.type) {
    case WishListActionTypes.Add:
      console.log(state.likedProducts);

      return {
        ...state,
        likedProducts: [...likedProductsArray, action.product]
      };

    case WishListActionTypes.Remove:
      const removeIndex = likedProductsArray.indexOf(action.product);
      const newProductArray = [...likedProductsArray];
      newProductArray.splice(removeIndex, 1);

      return {
        ...state,
        likedProducts: newProductArray
      };

    default:
      return state;
  }
}

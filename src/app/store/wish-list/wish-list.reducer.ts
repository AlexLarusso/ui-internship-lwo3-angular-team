import { WishListActions, AddToWishList, RemoveFromWishList } from './wish-list.actions';

export interface IState {
  likedProducts: Array<string>;
}

const initialState = {
  likedProducts: JSON.parse(localStorage.getItem('liked')) || []
};

export function wishListReducer(state = initialState, action: WishListActions): IState {
  const { type, payload } = action;
  const likedProductsArray = state.likedProducts;

  switch (type) {
    case AddToWishList.TYPE:

      return {
        ...state,
        likedProducts: [...likedProductsArray, payload]
      };

    case RemoveFromWishList.TYPE:
      const removeIndex = likedProductsArray.indexOf(payload);
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

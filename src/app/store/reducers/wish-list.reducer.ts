import { WishListActions, AddToWishList, RemoveFromWishList } from '../actions/wish-list.actions';

export interface State {
  likedProducts: Array<string>;
}

const initialState = {
  likedProducts: []
};

export function wishListReducer(state = initialState, action: WishListActions): State {
  const likedProductsArray = state.likedProducts;

  switch (action.type) {
    case AddToWishList.TYPE:
      console.log(state.likedProducts);

      return {
        ...state,
        likedProducts: [...likedProductsArray, action.product]
      };

    case RemoveFromWishList.TYPE:
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

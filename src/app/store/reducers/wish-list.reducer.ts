import { WishListActions, AddToWishList, RemoveFromWishList, SetToWishList } from '../actions/wish-list.actions';

export interface IState {
  likedProducts: Array<string>;
}

const initialState = {
  likedProducts: []
};

export function wishListReducer(state = initialState, action: WishListActions): IState {
  const likedProductsArray = state.likedProducts;

  switch (action.type) {
    case AddToWishList.TYPE:

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

    case SetToWishList.TYPE:
      return {
        ...state,
        likedProducts: action.product
      };

    default:
      return state;
  }
}

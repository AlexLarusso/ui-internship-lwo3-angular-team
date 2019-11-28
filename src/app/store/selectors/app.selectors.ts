import { IAppState } from '../app.store';

export const getLoader = (state: IAppState) => state.loader;
export const getProductOptions = (state: IAppState) => state.productOptions;
export const getWishList = (state: IAppState) => state.wishList;
export const getStorage = (state: IAppState) => state.webStorage;
export const getProducts = (state: IAppState) => state.products;
export const getCartProducts = (state: IAppState) => state.cart;
export const getAuth = (state: IAppState) => state.auth;

import {
  LoadProducts,
  FilterByGender,
  FilterBySeason,
  ProductsActionTypes } from '../actions/products.action';

const payload = 'woman';

describe('FilterByGenderAction', () => {
  it('should filter by gender', () => {
    const action = new FilterByGender(payload);

    expect({ ...action }).toEqual({
      type: ProductsActionTypes.FilterByGender,
      payload
    });
  });
});

describe('FilterBySeasonAction', () => {
  it('should filter by season', () => {
    const action = new FilterBySeason(payload);

    expect({ ...action }).toEqual({
      type: ProductsActionTypes.FilterBySeason,
      payload
    });
  });
});

describe('LoadProductsAction', () => {
  it('should load products from server', () => {
    const action = new LoadProducts();

    expect({ ...action }).toEqual({
      type: ProductsActionTypes.LoadProducts,
    });
  });
});

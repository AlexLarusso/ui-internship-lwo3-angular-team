import {
  LoadProducts,
  FilterByGender,
  FilterBySeason,
  ProductsActionTypes
  } from '../actions/products.action';

const payloadMock = 'woman';

describe('FilterByGenderAction', () => {
  it('should filter by gender', () => {
    const action = new FilterByGender(payloadMock);

    expect({ ...action }).toEqual({
      type: ProductsActionTypes.FilterByGender,
      payloadMock
    });
  });
});

describe('FilterBySeasonAction', () => {
  it('should filter by season', () => {
    const action = new FilterBySeason(payloadMock);

    expect({ ...action }).toEqual({
      type: ProductsActionTypes.FilterBySeason,
      payloadMock
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

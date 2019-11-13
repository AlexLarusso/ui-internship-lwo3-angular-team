// import {
//   LoadProducts,
//   FilterByGender,
//   FilterBySeason,
//   ProductsActionTypes
// } from '../actions/products.action';

// xdescribe('FilterByGenderAction', () => {
//   const payloadMock = 'woman';

//   xdescribe('FilterByGenderAction', () => {
//     it('should filter by gender', () => {
//       const action = new FilterByGender(payloadMock);

//       expect({ ...action }).toEqual({
//         type: ProductsActionTypes.FilterByGender,
//         payloadMock
//       });
//     });
//   });

//   xdescribe('FilterBySeasonAction', () => {
//     it('should filter by season', () => {
//       const action = new FilterBySeason(payloadMock);

//       expect({ ...action }).toEqual({
//         type: ProductsActionTypes.FilterBySeason,
//         payloadMock
//       });
//     });
//   });

//   xdescribe('LoadProductsAction', () => {
//     it('should load products from server', () => {
//       const action = new LoadProducts();

//       expect({ ...action }).toEqual({
//         type: ProductsActionTypes.LoadProducts,
//       });
//     });
//   });
// });

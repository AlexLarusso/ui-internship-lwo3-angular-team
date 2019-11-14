// import { PaypalCheckoutComponent } from './paypal-checkout.component';
// import { getCartTotalPrice } from 'src/app/store/selectors/cart.selector';

// xdescribe( 'PaypalCheckoutComponent', () => {
//   const subscribeValueMock = 'value';
//   let subscribeMock;
//   let component;
//   let mockStore;
//   let totalPriceMock = 0;
//   let element;

//   function setMocks() {
//     element = {
//       nativeElement: null
//     };
//     window['paypal'] = {
//       Buttons: jasmine.createSpy('paypal:Buttons').and
//         .returnValue({render: jasmine.createSpy('Buttons:render')}).withArgs(element.nativeElement)
//       };
//     mockStore = {
//       dispatch: jasmine.createSpy('mockStore:dispatch'),
//       select: jasmine.createSpy('mockStore:select').and.returnValue({
//         subscribe: (callback) => {
//           callback(subscribeValueMock);
//           return subscribeMock;
//         }
//       })
//     };
//     window['paypal'].Buttons = { createOrder: jasmine.createSpy('Buttons: createOrder')};
//     component = new PaypalCheckoutComponent(mockStore);

//     subscribeMock = {
//       unsubscribe: jasmine.createSpy('cartTotalPriceSubMock:unsubscribe')
//     };
//   }

//   beforeEach(() => {
//     setMocks();
//   });

//   it('Should be defined', () => {
//     expect(component).toBeDefined();
//   });

//   it('should inject store correctly', () => {
//     expect(component.store).toEqual(mockStore);
//   });

//   describe('ngOnInit():', () => {
//     beforeEach(() => {
//       component.ngOnInit();
//     });

//     it('should call correct store selector', () => {
//       expect(component.store.select).toHaveBeenCalledWith(getCartTotalPrice);
//     });
//   });

//   describe('ngDestroy():', () => {
//     it('should call unsubscribe() on cartTotalPriceSubMock', () => {
//       component.ngOnInit();
//       component.ngOnDestroy();
//       expect(component.subscribeMock.unsubscribe).toHaveBeenCalled();
//     });
//   });
// });

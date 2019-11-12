import { CartPageComponent } from './cart-page.component';

import {
  getCartProductItems, getCartTotalPrice
} from 'src/app/store/selectors/cart.selector';
import { ConfirmOrder } from 'src/app/store/actions/cart.actions';


describe('CartPageComponent: ', () => {
  const selectMockValue = 'stream';

  let subscriptionMock;
  let component;
  let storeMock;

  function setMocks() {
    storeMock = {
      select: jasmine.createSpy('storeMock:select')
        .and.returnValue(selectMockValue),
      dispatch: jasmine.createSpy('storeMock:dispatch')
    };
    subscriptionMock = {
      unsubscribe: jasmine.createSpy('subscriptionMock:unsubsrcibe')
    };
  }

  beforeEach(() => {
    setMocks();
    component = new CartPageComponent(storeMock);
  });

  it('should be defined', () => {
    expect(CartPageComponent).toBeDefined();
  });

  it('should inject store correctly', () => {
    expect(component.store).toEqual(storeMock);
  });

  describe('ngOnInit():', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call correct store selectors', () => {
      expect(component.store.select).toHaveBeenCalledWith(getCartProductItems);
      expect(component.store.select).toHaveBeenCalledWith(getCartTotalPrice);
    });

    it('should set correct properties', () => {
      expect(component.cartProductList$).toEqual(selectMockValue);
      expect(component.cartTotalPrice$ ).toEqual(selectMockValue);
    });
  });

  describe('displayPopularList():', () => {
    it('should set isPopularListVisible property to equal true', () => {
      component.displayPopularList();
      expect(component.isPopularListVisible).toBeTruthy();
    });
  });

  describe('confirmOrder():', () => {
    it('should dispatch ConfirmOrder', () => {
      component.confirmOrder();
      expect(component.store.dispatch).toHaveBeenCalledWith(new ConfirmOrder());
    });
  });
});

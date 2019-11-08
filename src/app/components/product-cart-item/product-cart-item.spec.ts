import { ProductCartItemComponent } from './product-cart-item.component';
import { RemoveProductFromCart, ChangeProductItemQty } from 'src/app/store/actions/cart.actions';

fdescribe('ProductCartItemComponent: ', () => {
  const qtyMock = 10;

  let storeMock;
  let component;

  function setMocks() {
    storeMock = {
      dispatch: jasmine.createSpy('storeMock:dispatch')
    };
  }

  beforeEach(() => {
    setMocks();
    component = new ProductCartItemComponent(storeMock);
  });

  it('should be defined', () => {
    expect(ProductCartItemComponent).toBeDefined();
  });

  it('should inject store correctly', () => {
    expect(component.store).toEqual(storeMock);
  });

  describe('removeItemFromCart():', () => {
    it('should dispatch RemoveProductFromCart with component.productItem as payload', () => {
      component.removeItemFromCart();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new RemoveProductFromCart(component.productItem));
    });
  });

  describe('handleQtyChange():', () => {
    it('should dispatch ChangeProductItemQty with component.productItem and given value as payload', () => {
      component.handleQtyChange(qtyMock);

      expect(storeMock.dispatch).toHaveBeenCalledWith(new ChangeProductItemQty({
        product: component.productItem,
        newQty: qtyMock
      }));
    });
  });

});

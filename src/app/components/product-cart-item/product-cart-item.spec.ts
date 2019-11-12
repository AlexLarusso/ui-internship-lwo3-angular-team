import { ProductCartItemComponent } from './product-cart-item.component';
import { RemoveProductFromCart, ChangeProductItemQty } from 'src/app/store/actions/cart.actions';

describe('ProductCartItemComponent: ', () => {
  const qtyMock = 10;
  const productIdMock = 'MOCK_ID';

  let storeMock;
  let component;
  let productItemMock;

  function setMocks() {
    storeMock = {
      dispatch: jasmine.createSpy('storeMock:dispatch')
    };

    productItemMock = {
      id: productIdMock,
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

  describe('ngOnInit():', () => {
    it('should set productRouterLink property correctly', () => {
      component.productItem = productItemMock;
      component.ngOnInit();

      expect(component.productRouterLink).toEqual(`/products/${productIdMock}`);
    });
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

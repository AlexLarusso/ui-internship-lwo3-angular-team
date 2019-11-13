import { SelectQuantityComponent } from './select-quantity.component';

describe('SelectQuantityComponent: ', () => {
  const maxNumberInputMock = 10;
  const startNumberInputMock = 1;

  let component;

  function setMocks() {
    component = new SelectQuantityComponent();
    component.maxNumber = maxNumberInputMock;
    component.startNumber = startNumberInputMock;
    component.quantityChanged.next = jasmine.createSpy('quantityChanged:next');
  }

  beforeEach(() => {
    setMocks();
  });

  it('should be defined', () => {
    expect(SelectQuantityComponent).toBeDefined();
  });

  describe('ngOnInit():', () => {
    it('should set property value correctly', () => {
      component.ngOnInit();
      expect(component.value).toEqual(startNumberInputMock);
    });
  });

  describe('onChange():', () => {
    it('should set property value if param is within limit and emit quantityChanged', () => {
      component.value = startNumberInputMock;
      component.onChange(component.increment);

      expect(component.value).toEqual(startNumberInputMock + component.increment);
      expect(component.quantityChanged.next).toHaveBeenCalledWith(startNumberInputMock + component.increment);
    });

    it('should call toggleLimit() method if param is out of limit and not change value param', () => {
      component.value = maxNumberInputMock;
      component.toggleLimit = jasmine.createSpy('component.toggleLimit');
      component.onChange(component.increment);

      expect(component.value).toEqual(maxNumberInputMock);
      expect(component.toggleLimit).toHaveBeenCalled();
    });
  });
});

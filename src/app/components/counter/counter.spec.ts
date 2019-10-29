import { CounterComponent } from './counter.component';
import { getCount } from 'src/app/store/selectors/counter.selectors';
import { Increment, Decrement, Reset } from 'src/app/store/actions/counter.actions';

describe('CounterComponent: ', () => {
  let component;
  let storeMock;
  let countMock = 1;

  function setMocks() {
    storeMock = {
      select: jasmine.createSpy('storeMock:selelct').and.returnValue(countMock),
      dispatch: jasmine.createSpy('storeMock:dispatch')
    };
    component = new CounterComponent(storeMock);
  }

  beforeEach(() => {
    setMocks();
  });

  it('should be defined', () => {
    expect(CounterComponent).toBeDefined();
  });

  describe('ngOnInit():', () => {
    it('should set correct properties', () => {
      component.ngOnInit();

      expect(component.store.select).toHaveBeenCalledWith(getCount);
      expect(component.count$).toBe(countMock);
    });
  });

  describe('increment()', () => {
    it('should dispatch Increment', () => {
      component.increment();

      expect(component.store.dispatch).toHaveBeenCalledWith(new Increment());
    });
  });

  describe('decrement()', () => {
    it('should dispatch Increment', () => {
      component.decrement();

      expect(component.store.dispatch).toHaveBeenCalledWith(new Decrement());
    });
  });

  describe('reset()', () => {
    it('should dispatch Increment', () => {
      component.reset();

      expect(component.store.dispatch).toHaveBeenCalledWith(new Reset());
    });
  });
});
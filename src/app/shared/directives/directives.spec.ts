import { ImageLoadDirective } from './image-loader.directive';

describe('ImageLoadDirective: ', () => {
  const elementMock = {
    nativeElement: null
  };
  let component;
<<<<<<< HEAD
  let directiveMock;
  // let argsMock;
  let element = new MockElementRef();
  let observerMock;
  let downloadImage = new EventEmitter();
  let elementMock;
  const entranceObj = {
=======
  const expectedOptions = {
    root: 'rootMock',
    rootMargin: '0px',
    threshold: [0, 0.5, 1.0]
  };
  const entriesMock = {
>>>>>>> 00e0ee5006d2762a7807a4ab09d8a06147ab7fdd
    isIntersecting: true,
    target: null
  };

  function setMocks() {
    document.querySelector = jasmine.createSpy('document:querySelector')
      .and.returnValue(expectedOptions.root);
    component = new ImageLoadDirective(elementMock);
  }

  beforeEach(() => {
<<<<<<< HEAD
    elementMock = {
      nativeElement: {}
    };
    const entranceMock = {
      isIntersecting: { },
      target: { }
    };
=======
    setMocks();
  });

  it('should have correct properties', () => {
    expect(component.options).toEqual(expectedOptions);
  });
>>>>>>> 00e0ee5006d2762a7807a4ab09d8a06147ab7fdd

  describe('ngAfterViewInit(): ', () => {
    const observerMock = {
      observe: jasmine.createSpy('observerMock:observe'),
      unobserve: jasmine.createSpy('observerMock:unobserve'),
      disconnect: jasmine.createSpy('observerMock:disconnect')
    };

    beforeEach(() => {
      (window as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver')
        .and.callFake(entries => {
          entries = entriesMock;

          return observerMock;
        });
      (window as any).EventEmitter = jasmine.createSpy('EventEmitter');

      component.ngAfterViewInit();
    });

    it('should define element', () => {
      expect(component.element).toEqual(elementMock);
    });

    it('should call IntersectionObserver', () => {
      expect(IntersectionObserver).toHaveBeenCalled();
    });

    it('should define correct observer', () => {
      expect(component.observer).toBeDefined();
      expect(component.observer.observe).toBeDefined();
    });

    it('should call observer.observe with correct params', () => {
      expect(component.observer.observe).toHaveBeenCalledWith(elementMock.nativeElement);
    });

    describe('checkForIntersection(): ', () => {
      const observerMock = {
        observe: jasmine.createSpy('observerMock:observe'),
        unobserve: jasmine.createSpy('observerMock:unobserve'),
        disconnect: jasmine.createSpy('observerMock:disconnect')
      };

      beforeEach(() => {
        (window as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver')
          .and.callThrough()
          .and.callFake(entries => {
            entries = entriesMock;

            return observerMock;
          });
        component.checkForIntersection([entriesMock]);
      });
      it('should call observer.observe with correct params', () => {
        expect(component.observer.unobserve).toHaveBeenCalledWith(elementMock.nativeElement);
      });

      it('should call observer.unobserve with correct params', () => {
        entriesMock.isIntersecting = false;
        expect(component.observer.unobserve).not.toThrowError();
      });

      it('should call observer.disconnect and disconnect from intersection observer', () => {
        expect(component.observer.disconnect).toHaveBeenCalled();
      });
    });
  });
});

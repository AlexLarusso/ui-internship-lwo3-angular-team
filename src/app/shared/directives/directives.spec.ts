// import { ImageLoadDirective } from './image-loader.directive';
// import { async, TestBed } from '@angular/core/testing';
// import { ElementRef, asNativeElements, EventEmitter } from '@angular/core';

// describe('IntersectionObserverMockTest', () => {
//   class MockElementRef extends ElementRef {
//     constructor() { super(undefined); }
//     // nativeElement = {};
//   }


//   // const observeMock = {
//   //   observe: () => null,
//   //   unobserve: () => null,
//   //   disconnect: () => null
//   // };

//   let component;
//   let directiveMock;
//   // let argsMock;
//   let element = new MockElementRef();
//   let observerMock;
//   let downloadImage = new EventEmitter();
//   let elementMock;
//   let entranceObj = {
//     isIntersecting: true,
//     target: true
//   };

//   function setMocks() {
//     component = new ImageLoadDirective(element);
//     directiveMock = {
//       observe: jasmine.createSpy('directiveMock:observe'),
//       unobserve: jasmine.createSpy('directiveMock:unobserve'),
//       disconnect: jasmine.createSpy('directiveMock:disconnect'),
//       isIntersecting: jasmine.createSpy('directiveMock:isIntersecting'),
//       target: jasmine.createSpy('directiveMock:target'),
//       entrance: jasmine.createSpyObj('directiveMock:entrance', entranceObj),
//       emit: jasmine.createSpy('directiveMock:emit').and.returnValue(false),
//       downloadImage: jasmine.createSpy('directiveMock:downloadImage'),
//       // element: jasmine.createSpy('directiveMock:element').and.returnValue(element)
//       // every: jasmine.createSpy('directiveMock:downloadImage').and.returnValue([intersecting, target])
//     };
//     // argsMock = {
//     //   // element: jasmine.createSpy('directiveMock:element').and.returnValue(element),
//     // };
//   }

//   beforeEach(() => {
//     elementMock = {
//       nativeElement: {}
//     };
//     let entranceMock = {
//       isIntersecting: { },
//       target: { }
//     };

//     observerMock = {
//       observe: jasmine.createSpy('directiveMock:observe').and.returnValue([entranceMock]),
//       unobserve: jasmine.createSpy('directiveMock:unobserve')
//     };

//     new IntersectionObserver(() => observerMock);
//     console.info(elementMock,typeof(elementMock.nativeElement));

//     setMocks();
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: ElementRef, useClass: MockElementRef
//         }
//       ]
//     }).compileComponents();
//     element = TestBed.get(ElementRef);
//   });


//   it('should be defined', () => {
//     expect(ImageLoadDirective).toBeDefined();
//     console.info(elementMock, typeof(elementMock.nativeElement));

//   });

//   fdescribe('ngAfterViewInit():', () => {
//     it('should set correct properties', () => {
//       component.ngAfterViewInit();
//       console.info(elementMock, typeof(elementMock.nativeElement));

//       // expect(component.observer.observe).toHaveBeenCalledWith();
//     });
//   });

//   // fdescribe('checkForIntersection()', () => {
//   //   it('should check if intersecting', () => {
//   //     component.checkIntersecting(entranceObj);
//   //     expect(component.entrance.entrance).toHaveBeenCalled();
//   //     expect(component.element.element).toHaveBeenCalled();
//   //   });

//   //   it('should dispatch intersection audit', () => {
//   //     expect(component.checkForIntersection).toHaveBeenCalledWith(directiveMock.every);
//   //     expect(component.directiveMock.emit().toHaveBeenCalled());
//   //     expect(component.directiveMock.disconnect()).toHaveBeenCalled();
//   //   });
//   // });
// });

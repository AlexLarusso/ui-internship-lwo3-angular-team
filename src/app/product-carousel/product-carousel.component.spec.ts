import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';

import { ProductCarouselComponent } from './product-carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductItemComponent } from '../shared/product-item/product-item.component';

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCarouselComponent,
        ProductItemComponent,
       ],
       imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule
      ],
      providers: [HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check number of visible for page width 600px', () => {
    component.pageWidth = 600;
    component.indicateViewNumber();

    expect(component.visibleNum === 2)
      .toBeTruthy('number of visible slide should be 2');
  });

  it('Check number of visible for page width 500px', () => {
    component.pageWidth = 500;
    component.indicateViewNumber();

    expect(component.visibleNum === 3)
      .toBeFalsy('expected not to be 3');
  });

  it('MoveToPrev button should be disabled', () => {
    component.additionalScroll = 0;
    component.visibleNum = 4;
    component.productArray.length = 20;
    component.itemWidth = 260;

    component.moveTo('next');
    component.moveTo('prev');

    expect(!component.canMoveToPrev)
      .toBeTruthy();
  });
});

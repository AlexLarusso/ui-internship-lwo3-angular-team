import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollComponent } from './scroll.component';
import { ScrollService } from '../scroll.service';
import { ElementRef } from '@angular/core';


describe('ScrollComponent', () => {
  let component: ScrollComponent;
  let fixture: ComponentFixture<ScrollComponent>;
  let service: ScrollService;
  const ITEMS_NUMBER = 10;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollComponent ],
      imports: [ FontAwesomeModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ScrollService);
    for(let i = 0; i < ITEMS_NUMBER; i++) {
      service.addAnchor(new ElementRef('div'));
    }
    fixture = TestBed.createComponent(ScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Item clicks should call onSelect method', () => {
    const fakeClick = new MouseEvent('click', {bubbles: true});
    const items = [...fixture.debugElement.nativeElement.querySelectorAll('li')];
    const spy = spyOn(component, 'onItemSelect');

    items.forEach(item => {
      item.dispatchEvent(fakeClick);
    });
    expect(spy).toHaveBeenCalledTimes(items.length);
  });

  it('Should have number of items as provided by service', () => {
    expect(component.pageComponents.length).toEqual(ITEMS_NUMBER);
  });

  it('Should update number of items', () => {
    const additionalItems = 5;
    for(let i = 0; i < additionalItems; i++) {
      service.addAnchor(new ElementRef('div'));
    }
    expect(component.pageComponents.length).toEqual(ITEMS_NUMBER + additionalItems);
  });



});

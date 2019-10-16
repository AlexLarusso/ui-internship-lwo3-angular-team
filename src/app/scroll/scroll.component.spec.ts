import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollComponent } from './scroll.component';

describe('ScrollComponent', () => {
  let component: ScrollComponent;
  let fixture: ComponentFixture<ScrollComponent>;
  const ITEMS_NUMBER = 10;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollComponent);
    component = fixture.componentInstance;
    for (let i = 0; i < ITEMS_NUMBER; i++) {
      component.pageComponents.push({
        selector: i.toString(),
        title: i.toString()
      });
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of items', () => {
    const items = [...fixture.debugElement.nativeElement.querySelectorAll('li')];

    expect(items.length).toEqual(ITEMS_NUMBER);
  });

  it('Item clicks should call onSelect method', () => {
    const fakeClick = new MouseEvent('click', { bubbles: true });
    const items = [...fixture.debugElement.nativeElement.querySelectorAll('li')];
    const spy = spyOn(component, 'onItemSelect');

    items.forEach(item => {
      item.dispatchEvent(fakeClick);
    });
    expect(spy).toHaveBeenCalledTimes(items.length);
  });
});

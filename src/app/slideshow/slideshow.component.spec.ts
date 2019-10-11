import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SlideshowComponent } from './slideshow.component';
import { HeaderComponent } from '../header/header.component';
import { PromoComponent } from '../header/promo/promo.component';
import { CategoryMenuComponent } from '../header/category-menu/category-menu.component';
import { LineBarComponent } from '../header/line-bar/line-bar.component';
import { MainMenuComponent } from '../header/main-menu/main-menu.component';
import { ButtonComponent } from '../shared/button/button.component';
import { MainLogoComponent } from '../shared/main-logo/main-logo.component';



describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;
  let fakePaginationClick: Event;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      SlideshowComponent,
      HeaderComponent,
      PromoComponent,
      CategoryMenuComponent,
      LineBarComponent,
      MainMenuComponent,
      ButtonComponent,
      MainLogoComponent],
      imports: [FontAwesomeModule,
      BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakePaginationClick = new MouseEvent('click', { bubbles: true });
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on the next arrow button should change slide to the left', () => {
    const fakeNextClick = new MouseEvent('click', { bubbles: true });
    component.nextEl.nativeElement.dispatchEvent(fakeNextClick);
    expect(component.currentIndex).toBe(1);
  });

  it('click on the previous arrow button should change slide to the right', () => {
    const fakePrevClick = new MouseEvent('click', { bubbles: true });
    component.previousEl.nativeElement.dispatchEvent(fakePrevClick);
    expect(component.currentIndex).toBe(3);
  });

  it('click on the pagination button should change direction', () => {
    ([...component.bulletEl.nativeElement.childNodes][2]).dispatchEvent(fakePaginationClick);
    ([...component.bulletEl.nativeElement.childNodes][1]).dispatchEvent(fakePaginationClick);
    expect(component.currentDirection).toBe('right');
  });

  it('click on the pagination button should stop timer', () => {
    ([...component.bulletEl.nativeElement.childNodes][2]).dispatchEvent(fakePaginationClick);
    expect(component.clicked).toBe(true);
  });

  it('click on the pagination button should work properly', () => {
    ([...component.bulletEl.nativeElement.childNodes][2]).dispatchEvent(fakePaginationClick);
    expect(component.currentIndex).not.toBe(0);
  });
  it('after 4 seconds the slide should change', async () => {
    await new Promise(res => setTimeout(() => {
      expect(component.currentIndex).not.toBe(0);
      res();
    }, 4000));
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }                      from '@angular/forms';

import { JoinUsComponent }                  from './join-us.component';
import { ButtonComponent } from '../shared/button/button.component';

describe('JoinUsComponent', () => {
  let component: JoinUsComponent;
  let fixture: ComponentFixture<JoinUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,],
      declarations: [JoinUsComponent, ButtonComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input should be invalid', () => {
    expect(component.onValidate()).toBeFalsy();
  });

  it('onValidate should be true', () => {
    expect(component.onValidate('dasdasd@gmail.com')).toBeFalsy();
  });

  it('onInit should be invalid', () => {
    expect(component.ngOnInit()).toBeFalsy();
  });

});

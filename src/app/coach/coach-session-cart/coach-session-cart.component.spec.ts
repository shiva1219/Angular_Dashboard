import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSessionCartComponent } from './coach-session-cart.component';

describe('CoachSessionCartComponent', () => {
  let component: CoachSessionCartComponent;
  let fixture: ComponentFixture<CoachSessionCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachSessionCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSessionCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

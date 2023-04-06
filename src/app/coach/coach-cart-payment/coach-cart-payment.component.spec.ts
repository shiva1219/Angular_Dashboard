import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCartPaymentComponent } from './coach-cart-payment.component';

describe('CoachCartPaymentComponent', () => {
  let component: CoachCartPaymentComponent;
  let fixture: ComponentFixture<CoachCartPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachCartPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachCartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

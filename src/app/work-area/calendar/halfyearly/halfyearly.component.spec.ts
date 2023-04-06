import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfyearlyComponent } from './halfyearly.component';

describe('HalfyearlyComponent', () => {
  let component: HalfyearlyComponent;
  let fixture: ComponentFixture<HalfyearlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfyearlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfyearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

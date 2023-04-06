import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorComponentComponent } from './validator-component.component';

describe('ValidatorComponentComponent', () => {
  let component: ValidatorComponentComponent;
  let fixture: ComponentFixture<ValidatorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

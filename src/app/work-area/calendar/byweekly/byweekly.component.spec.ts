import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByweeklyComponent } from './byweekly.component';

describe('ByweeklyComponent', () => {
  let component: ByweeklyComponent;
  let fixture: ComponentFixture<ByweeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByweeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByweeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSessionComponent } from './coach-session.component';

describe('CoachSessionComponent', () => {
  let component: CoachSessionComponent;
  let fixture: ComponentFixture<CoachSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

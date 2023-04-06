import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSessionEditComponent } from './coach-session-edit.component';

describe('CoachSessionEditComponent', () => {
  let component: CoachSessionEditComponent;
  let fixture: ComponentFixture<CoachSessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachSessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

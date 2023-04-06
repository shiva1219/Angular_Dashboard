import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProfileHomeComponent } from './coach-profile-home.component';

describe('CoachProfileHomeComponent', () => {
  let component: CoachProfileHomeComponent;
  let fixture: ComponentFixture<CoachProfileHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachProfileHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

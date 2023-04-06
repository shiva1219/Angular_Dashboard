import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProfileActivitiesComponent } from './coach-profile-activities.component';

describe('CoachProfileActivitiesComponent', () => {
  let component: CoachProfileActivitiesComponent;
  let fixture: ComponentFixture<CoachProfileActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachProfileActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfileActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

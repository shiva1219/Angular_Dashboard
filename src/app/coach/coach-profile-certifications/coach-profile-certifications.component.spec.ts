import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProfileCertificationsComponent } from './coach-profile-certifications.component';

describe('CoachProfileCertificationsComponent', () => {
  let component: CoachProfileCertificationsComponent;
  let fixture: ComponentFixture<CoachProfileCertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachProfileCertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfileCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

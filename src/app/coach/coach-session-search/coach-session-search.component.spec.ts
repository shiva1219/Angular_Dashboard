import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSessionSearchComponent } from './coach-session-search.component';

describe('CoachSessionSearchComponent', () => {
  let component: CoachSessionSearchComponent;
  let fixture: ComponentFixture<CoachSessionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachSessionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSessionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCongratsComponent } from './coach-congrats.component';

describe('CoachCongratsComponent', () => {
  let component: CoachCongratsComponent;
  let fixture: ComponentFixture<CoachCongratsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachCongratsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachCongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

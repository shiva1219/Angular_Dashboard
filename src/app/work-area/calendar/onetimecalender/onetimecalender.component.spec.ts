import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimecalenderComponent } from './onetimecalender.component';

describe('OnetimecalenderComponent', () => {
  let component: OnetimecalenderComponent;
  let fixture: ComponentFixture<OnetimecalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnetimecalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetimecalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

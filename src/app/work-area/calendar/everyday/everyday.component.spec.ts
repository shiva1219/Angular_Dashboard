import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverydayComponent } from './everyday.component';

describe('EverydayComponent', () => {
  let component: EverydayComponent;
  let fixture: ComponentFixture<EverydayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverydayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prijava1Component } from './prijava1.component';

describe('Prijava1Component', () => {
  let component: Prijava1Component;
  let fixture: ComponentFixture<Prijava1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prijava1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prijava1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

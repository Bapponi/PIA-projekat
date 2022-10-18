import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredloziComponent } from './predlozi.component';

describe('PredloziComponent', () => {
  let component: PredloziComponent;
  let fixture: ComponentFixture<PredloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredloziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

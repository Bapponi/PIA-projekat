import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZComponent } from './pregled-z.component';

describe('PregledZComponent', () => {
  let component: PregledZComponent;
  let fixture: ComponentFixture<PregledZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlajderComponent } from './slajder.component';

describe('SlajderComponent', () => {
  let component: SlajderComponent;
  let fixture: ComponentFixture<SlajderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlajderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlajderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

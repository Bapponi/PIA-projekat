import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaZComponent } from './istorija-z.component';

describe('IstorijaZComponent', () => {
  let component: IstorijaZComponent;
  let fixture: ComponentFixture<IstorijaZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstorijaZComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijaZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

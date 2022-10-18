import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiKorisnikaComponent } from './detalji-korisnika.component';

describe('DetaljiKorisnikaComponent', () => {
  let component: DetaljiKorisnikaComponent;
  let fixture: ComponentFixture<DetaljiKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

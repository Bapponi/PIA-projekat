import { TestBed } from '@angular/core/testing';

import { RegistracijaZahteviService } from './registracija-zahtevi.service';

describe('RegistracijaZahteviService', () => {
  let service: RegistracijaZahteviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistracijaZahteviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

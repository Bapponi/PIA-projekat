import { TestBed } from '@angular/core/testing';

import { IstorijaZaduzenjaService } from './istorija-zaduzenja.service';

describe('IstorijaZaduzenjaService', () => {
  let service: IstorijaZaduzenjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstorijaZaduzenjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

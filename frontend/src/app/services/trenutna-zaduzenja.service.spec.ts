import { TestBed } from '@angular/core/testing';

import { TrenutnaZaduzenjaService } from './trenutna-zaduzenja.service';

describe('TrenutnaZaduzenjaService', () => {
  let service: TrenutnaZaduzenjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrenutnaZaduzenjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

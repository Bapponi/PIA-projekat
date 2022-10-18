import { TestBed } from '@angular/core/testing';

import { UtisakService } from './utisak.service';

describe('UtisakService', () => {
  let service: UtisakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtisakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

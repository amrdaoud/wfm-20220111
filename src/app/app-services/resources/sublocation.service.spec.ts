import { TestBed } from '@angular/core/testing';

import { SublocationService } from './sublocation.service';

describe('SublocationService', () => {
  let service: SublocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SublocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

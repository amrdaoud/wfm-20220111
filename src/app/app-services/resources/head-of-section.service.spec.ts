import { TestBed } from '@angular/core/testing';

import { HeadOfSectionService } from './head-of-section.service';

describe('HeadOfSectionService', () => {
  let service: HeadOfSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadOfSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

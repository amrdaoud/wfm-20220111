import { TestBed } from '@angular/core/testing';

import { SwapRequestService } from './swap-request.service';

describe('SwapRequestService', () => {
  let service: SwapRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

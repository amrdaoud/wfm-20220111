import { TestBed } from '@angular/core/testing';

import { NegotiateInterceptor } from './negotiate.interceptor';

describe('NegotiateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NegotiateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NegotiateInterceptor = TestBed.inject(NegotiateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

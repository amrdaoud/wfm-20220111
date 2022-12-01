import { TestBed } from '@angular/core/testing';

import { PretendInterceptor } from './pretend.interceptor';

describe('PretendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PretendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PretendInterceptor = TestBed.inject(PretendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

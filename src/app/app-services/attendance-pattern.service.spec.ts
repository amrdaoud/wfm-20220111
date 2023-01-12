import { TestBed } from '@angular/core/testing';

import { AttendancePatternService } from './attendance-pattern.service';

describe('AttendancePatternService', () => {
  let service: AttendancePatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancePatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

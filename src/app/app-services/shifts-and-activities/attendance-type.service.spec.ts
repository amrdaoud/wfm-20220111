import { TestBed } from '@angular/core/testing';

import { AttendanceTypeService } from './attendance-type.service';

describe('AttendanceTypeService', () => {
  let service: AttendanceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ScheduleDetailService } from './schedule-detail.service';

describe('ScheduleDetailService', () => {
  let service: ScheduleDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

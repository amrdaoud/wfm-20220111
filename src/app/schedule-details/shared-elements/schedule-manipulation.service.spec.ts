import { TestBed } from '@angular/core/testing';

import { ScheduleManipulationService } from './schedule-manipulation.service';

describe('ScheduleManipulationService', () => {
  let service: ScheduleManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

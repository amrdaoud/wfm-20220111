import { TestBed } from '@angular/core/testing';

import { StaffTypeService } from './staff-type.service';

describe('StaffTypeService', () => {
  let service: StaffTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

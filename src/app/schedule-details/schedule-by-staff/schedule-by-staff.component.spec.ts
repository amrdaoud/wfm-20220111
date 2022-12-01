import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleByStaffComponent } from './schedule-by-staff.component';

describe('ScheduleByStaffComponent', () => {
  let component: ScheduleByStaffComponent;
  let fixture: ComponentFixture<ScheduleByStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleByStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleByStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

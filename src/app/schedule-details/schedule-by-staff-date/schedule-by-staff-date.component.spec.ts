import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleByStaffDateComponent } from './schedule-by-staff-date.component';

describe('ScheduleByStaffDateComponent', () => {
  let component: ScheduleByStaffDateComponent;
  let fixture: ComponentFixture<ScheduleByStaffDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleByStaffDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleByStaffDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

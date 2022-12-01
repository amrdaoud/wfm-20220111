import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListHosUserComponent } from './schedule-list-hos-user.component';

describe('ScheduleListHosUserComponent', () => {
  let component: ScheduleListHosUserComponent;
  let fixture: ComponentFixture<ScheduleListHosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleListHosUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListHosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

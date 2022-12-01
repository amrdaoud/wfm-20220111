import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDetailsTableComponent } from './schedule-details-table.component';

describe('ScheduleDetailsTableComponent', () => {
  let component: ScheduleDetailsTableComponent;
  let fixture: ComponentFixture<ScheduleDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

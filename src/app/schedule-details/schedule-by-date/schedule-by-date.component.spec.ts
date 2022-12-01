import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleByDateComponent } from './schedule-by-date.component';

describe('ScheduleByDateComponent', () => {
  let component: ScheduleByDateComponent;
  let fixture: ComponentFixture<ScheduleByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

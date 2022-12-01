import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesReportComponent } from './activities-report.component';

describe('ActivitiesReportComponent', () => {
  let component: ActivitiesReportComponent;
  let fixture: ComponentFixture<ActivitiesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

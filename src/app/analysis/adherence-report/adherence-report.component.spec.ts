import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherenceReportComponent } from './adherence-report.component';

describe('AdherenceReportComponent', () => {
  let component: AdherenceReportComponent;
  let fixture: ComponentFixture<AdherenceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdherenceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

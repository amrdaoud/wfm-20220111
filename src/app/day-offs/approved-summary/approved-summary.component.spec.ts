import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSummaryComponent } from './approved-summary.component';

describe('ApprovedSummaryComponent', () => {
  let component: ApprovedSummaryComponent;
  let fixture: ComponentFixture<ApprovedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

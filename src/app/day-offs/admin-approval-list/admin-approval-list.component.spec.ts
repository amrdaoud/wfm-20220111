import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalListComponent } from './admin-approval-list.component';

describe('AdminApprovalListComponent', () => {
  let component: AdminApprovalListComponent;
  let fixture: ComponentFixture<AdminApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

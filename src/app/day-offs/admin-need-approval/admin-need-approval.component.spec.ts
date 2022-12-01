import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNeedApprovalComponent } from './admin-need-approval.component';

describe('AdminNeedApprovalComponent', () => {
  let component: AdminNeedApprovalComponent;
  let fixture: ComponentFixture<AdminNeedApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNeedApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

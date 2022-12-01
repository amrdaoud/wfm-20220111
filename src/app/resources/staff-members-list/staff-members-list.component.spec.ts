import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMembersListComponent } from './staff-members-list.component';

describe('StaffMembersListComponent', () => {
  let component: StaffMembersListComponent;
  let fixture: ComponentFixture<StaffMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMembersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

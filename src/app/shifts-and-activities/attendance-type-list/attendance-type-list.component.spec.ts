import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTypeListComponent } from './attendance-type-list.component';

describe('AttendanceTypeListComponent', () => {
  let component: AttendanceTypeListComponent;
  let fixture: ComponentFixture<AttendanceTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

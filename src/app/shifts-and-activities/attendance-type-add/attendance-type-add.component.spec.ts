import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTypeAddComponent } from './attendance-type-add.component';

describe('AttendanceTypeAddComponent', () => {
  let component: AttendanceTypeAddComponent;
  let fixture: ComponentFixture<AttendanceTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

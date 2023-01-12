import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePatternUploadComponent } from './attendance-pattern-upload.component';

describe('AttendancePatternUploadComponent', () => {
  let component: AttendancePatternUploadComponent;
  let fixture: ComponentFixture<AttendancePatternUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancePatternUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePatternUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

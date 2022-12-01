import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCopyComponent } from './attendance-copy.component';

describe('AttendanceCopyComponent', () => {
  let component: AttendanceCopyComponent;
  let fixture: ComponentFixture<AttendanceCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

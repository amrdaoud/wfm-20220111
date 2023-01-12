import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePatternListComponent } from './attendance-pattern-list.component';

describe('AttendancePatternListComponent', () => {
  let component: AttendancePatternListComponent;
  let fixture: ComponentFixture<AttendancePatternListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancePatternListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePatternListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

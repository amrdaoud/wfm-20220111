import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalBoxComponent } from './interval-box.component';

describe('IntervalBoxComponent', () => {
  let component: IntervalBoxComponent;
  let fixture: ComponentFixture<IntervalBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

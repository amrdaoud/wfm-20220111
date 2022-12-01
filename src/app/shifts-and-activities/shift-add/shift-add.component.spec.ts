import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAddComponent } from './shift-add.component';

describe('ShiftAddComponent', () => {
  let component: ShiftAddComponent;
  let fixture: ComponentFixture<ShiftAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

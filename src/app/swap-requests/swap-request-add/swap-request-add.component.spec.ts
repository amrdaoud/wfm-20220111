import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapRequestAddComponent } from './swap-request-add.component';

describe('SwapRequestAddComponent', () => {
  let component: SwapRequestAddComponent;
  let fixture: ComponentFixture<SwapRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapRequestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

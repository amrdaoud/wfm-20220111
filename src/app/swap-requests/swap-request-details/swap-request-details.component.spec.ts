import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapRequestDetailsComponent } from './swap-request-details.component';

describe('SwapRequestDetailsComponent', () => {
  let component: SwapRequestDetailsComponent;
  let fixture: ComponentFixture<SwapRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

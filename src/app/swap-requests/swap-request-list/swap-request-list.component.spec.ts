import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapRequestListComponent } from './swap-request-list.component';

describe('SwapRequestListComponent', () => {
  let component: SwapRequestListComponent;
  let fixture: ComponentFixture<SwapRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

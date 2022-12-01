import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCardComponent } from './selector-card.component';

describe('SelectorCardComponent', () => {
  let component: SelectorCardComponent;
  let fixture: ComponentFixture<SelectorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

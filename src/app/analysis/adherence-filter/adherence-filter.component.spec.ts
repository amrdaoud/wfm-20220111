import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherenceFilterComponent } from './adherence-filter.component';

describe('AdherenceFilterComponent', () => {
  let component: AdherenceFilterComponent;
  let fixture: ComponentFixture<AdherenceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdherenceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherenceByHosComponent } from './adherence-by-hos.component';

describe('AdherenceByHosComponent', () => {
  let component: AdherenceByHosComponent;
  let fixture: ComponentFixture<AdherenceByHosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdherenceByHosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdherenceByHosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

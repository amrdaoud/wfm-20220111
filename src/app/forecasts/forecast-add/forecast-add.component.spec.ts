import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastAddComponent } from './forecast-add.component';

describe('ForecastAddComponent', () => {
  let component: ForecastAddComponent;
  let fixture: ComponentFixture<ForecastAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

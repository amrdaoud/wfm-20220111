import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationGuardAddComponent } from './transportation-guard-add.component';

describe('TransportationGuardAddComponent', () => {
  let component: TransportationGuardAddComponent;
  let fixture: ComponentFixture<TransportationGuardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationGuardAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationGuardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

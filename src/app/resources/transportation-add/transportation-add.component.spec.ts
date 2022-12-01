import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationAddComponent } from './transportation-add.component';

describe('TransportationAddComponent', () => {
  let component: TransportationAddComponent;
  let fixture: ComponentFixture<TransportationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

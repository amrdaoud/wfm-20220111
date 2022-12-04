import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublocationAddComponent } from './sublocation-add.component';

describe('SublocationAddComponent', () => {
  let component: SublocationAddComponent;
  let fixture: ComponentFixture<SublocationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SublocationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SublocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

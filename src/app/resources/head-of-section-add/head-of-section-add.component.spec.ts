import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfSectionAddComponent } from './head-of-section-add.component';

describe('HeadOfSectionAddComponent', () => {
  let component: HeadOfSectionAddComponent;
  let fixture: ComponentFixture<HeadOfSectionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadOfSectionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfSectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

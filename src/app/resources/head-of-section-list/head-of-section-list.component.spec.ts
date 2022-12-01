import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfSectionListComponent } from './head-of-section-list.component';

describe('HeadOfSectionListComponent', () => {
  let component: HeadOfSectionListComponent;
  let fixture: ComponentFixture<HeadOfSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadOfSectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

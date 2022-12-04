import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublocationListComponent } from './sublocation-list.component';

describe('SublocationListComponent', () => {
  let component: SublocationListComponent;
  let fixture: ComponentFixture<SublocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SublocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SublocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

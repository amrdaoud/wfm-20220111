import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableMenuComponent } from './selectable-menu.component';

describe('SelectableMenuComponent', () => {
  let component: SelectableMenuComponent;
  let fixture: ComponentFixture<SelectableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectableMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Transportation } from './../../../app-models/resources';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { AttendanceType } from 'src/app/app-models/attendance-types';
import { Activity, Shift } from 'src/app/app-models/ShiftsAndActivities';

@Component({
  selector: 'app-selectable-menu',
  templateUrl: './selectable-menu.component.html',
  styleUrls: ['./selectable-menu.component.css']
})
export class SelectableMenuComponent implements OnInit {
@Input() items: Observable<Transportation[] | AttendanceType[] | Activity[]> = of([]);
@Output() selected = new EventEmitter<Transportation | AttendanceType | Activity>();
filteredItems: Observable<any[]> = this.items;
searchControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(val => {
        return this.items.pipe(
          map((i: any) =>
          i.filter((x:Transportation | AttendanceType | Activity) => x.Name.toLowerCase().startsWith(val.toLowerCase())))
        )
      })
    )
  }
  onSelect(element: Transportation | AttendanceType | Activity) {
    this.selected.emit(element);
  }

}

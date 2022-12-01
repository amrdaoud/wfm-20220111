import { DayOffReportData } from './../../app-models/day-offs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/app-models/ShiftsAndActivities';
import { Transportation } from 'src/app/app-models/resources';

@Component({
  selector: 'app-approved-summary',
  templateUrl: './approved-summary.component.html',
  styleUrls: ['./approved-summary.component.css']
})
export class ApprovedSummaryComponent implements OnInit {
dataSource = new MatTableDataSource<DayOffReportData>();
@Input() data = new Observable<DayOffReportData[]>();
@Input() isLoading = new Observable<boolean>();
@Input() shifts: Transportation[] | null = [];
@Output() btnClicked = new EventEmitter<any>();
shiftNames: string[] = [];
allColumns: string[] = [];
@Input() isDisabled: boolean = true;
  constructor() { }

  ngOnInit(): void {

    this.data.subscribe(result => {
      this.shiftNames = this.shifts!.map(x => x.Name);
      this.dataSource = new MatTableDataSource(result);
      this.allColumns = ['WeekDay', ...this.shiftNames, 'TotalCount']
    })
  }
  shiftData(element: DayOffReportData, shiftName: string) {
    return element.ShiftData.find(x => x.ShiftName! === shiftName)?.Count;
  }
  clicked() {
    this.btnClicked.emit();
  }

}

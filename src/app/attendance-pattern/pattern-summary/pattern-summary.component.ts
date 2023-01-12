import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DailyAttendancePattern } from 'src/app/app-models/attendance-pattern';
import { weekDays } from 'src/app/app-models/shared/dictionaries';

@Component({
  selector: 'app-pattern-summary',
  templateUrl: './pattern-summary.component.html',
  styleUrls: ['./pattern-summary.component.css']
})
export class PatternSummaryComponent implements OnInit {
  weekDays = weekDays;
  columns = ['Day', 'Sublocation'];
  filteredData: DailyAttendancePattern[] = [];
  dataSource = new MatTableDataSource<any>([]);
  shifts: string[] = [];
  selectedDay ='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {rawData: DailyAttendancePattern[], involvedDays: string[]}) { }

  ngOnInit(): void {
    this.shifts = this.data.rawData.sort((a,b) => a.TransportationId - b.TransportationId).map(x => x.TransportationName).filter(this.onlyUnique)
    this.columns.push(...this.shifts, 'Total');
    this.getDataByDay(this.data.involvedDays[0]);
  }
  getDataByDay(day: string) {
    this.selectedDay = day;
    const result : any[] = [];
    this.filteredData = this.data.rawData.filter(x => !x.DayOffs.includes(day));
    const sublocations = this.data.rawData.sort((a,b) => a.SublocationId - b.SublocationId).map(x => x.SublocationName).filter(this.onlyUnique);
    sublocations.forEach(sublocation => {
      const element: any = {Day: day,Sublocation: sublocation};
      this.shifts.forEach(shift => {
        element[shift] = this.filteredData.filter(x => x.TransportationName === shift && x.SublocationName === sublocation).length;
      });
      result.push(element);
    });
    this.dataSource.data = result;
  }
  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  getTotalByShift(shift: string): number {
    return this.filteredData.filter(x => x.TransportationName === shift).length;
  }
  getTotalBySublocation(sublocation: string): number {
    return this.filteredData.filter(x => x.SublocationName === sublocation).length;
  }
  getTotal(): number {
    return this.filteredData.length;
  }

}

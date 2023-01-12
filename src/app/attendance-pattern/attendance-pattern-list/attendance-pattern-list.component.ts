import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { DailyAttendancePattern } from 'src/app/app-models/attendance-pattern';
import { weekDays } from 'src/app/app-models/shared/dictionaries';
import { AttendancePatternService } from 'src/app/app-services/attendance-pattern.service';
import { SublocationService } from 'src/app/app-services/resources/sublocation.service';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { filter,exhaustMap } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { PatternSummaryComponent } from '../pattern-summary/pattern-summary.component';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { getDaysBetween, getDaysBetweenString } from 'src/app/app-helpers/date-helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance-pattern-list',
  templateUrl: './attendance-pattern-list.component.html',
  styleUrls: ['./attendance-pattern-list.component.css']
})
export class AttendancePatternListComponent implements OnInit {
  selection = new SelectionModel<DailyAttendancePattern>(true, []);
  isLoading = this.patternService.isLoading;
  editElementIndex = -1;
  columns = ['select','StaffMemberEmployeeId','StaffMemberName','SublocationName', 'TransportationName', 'DayOffs','actions'];
  dataSource = new MatTableDataSource<DailyAttendancePattern>();
  frm = new FormGroup({});
  weekDays = weekDays;
  sublocations = this.sublocationService.subLocations();
  transportations = this.transportationService.transportations();
  summary$ = new BehaviorSubject<any[]>([]);
  involvedDays: string[] = [];
  constructor(private patternService: AttendancePatternService,
              private sublocationService: SublocationService,
              private transportationService: TransportationService,
              private confirm: ConfirmService,
              private dialog: MatDialog,
              private scheduleService: ScheduleService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.scheduleService.getUnpublished().
    pipe(
      tap(x => {
        if(x && x.Schedule && x.Schedule.StartDate && x.Schedule.EndDate) {
          this.involvedDays = getDaysBetweenString(x.Schedule.StartDate, x.Schedule.EndDate);
        }
      }),
      switchMap(() => this.patternService.getAllPatterns())
    )
    .subscribe(x => {
      this.dataSource.data = x;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  startEditing(i: number) {
    this.frm = this.patternService.createForm(this.dataSource.data[i]);
    this.editElementIndex = i;
  }
  submit() {
    this.patternService.addPattern(this.frm.value).subscribe(x => {
      this.dataSource.data[this.editElementIndex] = x;
      this.dataSource.data = [...this.dataSource.data]
      this.editElementIndex = -1;
    })
  }
  exclude(element: DailyAttendancePattern) {
    this.confirm.open('Are you sure you want to execlude Staff ' + element.StaffMemberName).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.patternService.deletePattern(element.Id)
      })
    ).subscribe(x => {
      if(x) {
        this.resetElement(this.dataSource.data[this.editElementIndex]);
        this.editElementIndex = -1;
      }
    });
  }
  resetElement(element: DailyAttendancePattern) {
    element.Id = 0;
    element.DayOffs = [];
    element.SublocationId = 0;
    element.SublocationName = '';
    element.TransportationId = 0;
    element.TransportationName = '';
  }
  getTotalIncluded(): number {
    return this.dataSource.data.filter(x => x.Id > 0).length;
  }
  getTotal(): number {
    return this.dataSource.data.length;
  }
  openSummary() {
    this.dialog.open(PatternSummaryComponent,{data: {rawData: this.dataSource.data.filter(x => x.Id), involvedDays: this.involvedDays},panelClass: 'summary-dialog'});
  }
  generate() {
    // this.confirm.open("Are you sure you want to generate schedule?, this process might take some minutes").pipe(
    //   filter(x => x),
    //   exhaustMap(() => this.patternService.generateSchedule())
    // ).subscribe(x => {
    //   if(x) {
    //     this.snackBar.open('Schedule Generated', 'Dismiss', {duration: 2000})
    //   }
    // })
  }
}

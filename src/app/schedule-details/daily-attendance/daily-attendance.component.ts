import { AttendanceCopyComponent } from './../attendance-copy/attendance-copy.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SearchAutocompleteComponent } from './../shared-elements/search-autocomplete/search-autocomplete.component';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, delay, distinctUntilChanged, exhaustMap, filter, finalize, merge, Observable, startWith, switchMap, tap, mergeMap, map, zip } from 'rxjs';
import { DailyAttendanceBySchedule, DailyAttendanceByStaff, DailyAttendanceByStaffWithSize, DailyAttendanceInfo } from 'src/app/app-models/schedule-details';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { InitialService } from 'src/app/app-services/root-services/initial.service';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { AttendanceTypeService } from 'src/app/app-services/shifts-and-activities/attendance-type.service';
import { AttendanceHistoryComponent } from '../attendance-history/attendance-history.component';

@Component({
  selector: 'app-daily-attendance',
  templateUrl: './daily-attendance.component.html',
  styleUrls: ['./daily-attendance.component.css']
})
export class DailyAttendanceComponent implements AfterViewInit, OnDestroy {
@HostListener('mouseup')
@HostListener('mouseleave')
onMouseup() {
    this.isMouseDown = false;
}
daysObservable = this.scheduleDetailService.involvedDays.pipe(
  tap(x => this.columns = ['Name','Adherence', ...x.map(String)])
);
isMouseDown = false;
copiedAttendance!: number | null;
isLoading = this.scheduleDetailService.statusAttendance;
dataSource = new MatTableDataSource<DailyAttendanceByStaff>();
columns!: any[];
scheduleId!: number;
haveAll = this.route.snapshot.url.map(x => x.path).includes('all');
dataSize!: number;
schedule!: DailyAttendanceBySchedule;
isAdmin = this.initialService.inRoles(['Admin']);
isHos = this.initialService.inRoles(['Hos']);
isUser = this.initialService.inRoles(['User']);
isSuper = this.initialService.inRoles(['SuperUser']);
attendanceTypes = this.attendanceTypeService.attendanceTypes;
isLoadingDetails = this.scheduleDetailService.statusEditingAttendance;
transportations = this.transportationService.transportations();
transportationSearchControl = new FormControl('');
transportationLoading = this.transportationService.status();
selectedDetails: number[] = [];
isAddingDetail = false;
sbRef!: MatSnackBarRef<AttendanceCopyComponent>;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
filterControl = new FormControl('');
typeControl = new FormControl('Staff');
  constructor(private scheduleDetailService: ScheduleDetailService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private initialService: InitialService,
              private attendanceTypeService: AttendanceTypeService,
              private transportationService: TransportationService,
              private confirm: ConfirmService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    const pageSearchChanges = merge(this.paginator.page,
          this.typeControl.valueChanges.pipe(
            filter(() => this.filterControl?.value),
            tap(() => this.paginator.pageIndex = 0)
          ),
          this.filterControl.valueChanges.pipe(
            debounceTime(600),
            distinctUntilChanged(),
            tap(() => this.paginator.pageIndex = 0)
          )).pipe(
            startWith({}),
            switchMap(() => {
              if(this.haveAll) {
                return this.scheduleDetailService
                .getDailyAttendanceAll(
                  this.scheduleId,
                  this.paginator.pageIndex,
                  this.paginator.pageSize,
                  this.filterControl.value,
                  this.typeControl.value
                  )
              }
              return this.scheduleDetailService
              .getDailyAttendance(
                this.scheduleId,
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.filterControl.value,
                this.typeControl.value
                )
            })
          );
      this.route.paramMap.pipe(
        delay(0),
        tap((p: ParamMap) => {
          this.scheduleId = +p.get('scheduleId')!;
        }),
        switchMap(() => {
          return pageSearchChanges;
        }),
      ).subscribe((result: any) => {
        this.schedule = result.Result;
        this.dataSource = new MatTableDataSource(result.Result.DailyStaffs);
        this.dataSize = result?.Size;
      });
  }



  getAttendanceTime(dailyAttendances: DailyAttendanceInfo[],day: Date): DailyAttendanceInfo | undefined {
    return dailyAttendances.find(x => x.Day === day);

  }
  getAttendanceTransportation(dailyAttendances: DailyAttendanceInfo[],day: Date): string {
    var q = dailyAttendances.find(x => x.Day === day);
    if(!q) {
      return '';
    }
    return q.TransportationName + ' (' + q.TransportationArriveTime.substring(0,5) + '-' + q.TransportationDepartTime.substring(0,5) + ')' + ' - ' + q.HeadOfSectionName;

  }
  getStyle(dailyAttendance: DailyAttendanceInfo[], day: Date): {[Klass: string]: any;} {
    var element = this.getAttendanceTime(dailyAttendance, day);
    if(element?.IsAbsence) {
      return {'color': element.Color, 'border-color': element.Color};
    }
    return {'background-color': element?.Color, 'border-color': element?.Color, 'color': this.getContrast(element?.Color!)}
  }
  editDailyAttendance(index: number, element: DailyAttendanceByStaff, detail: DailyAttendanceInfo, attendanceType: any) {
    this.scheduleDetailService.editDailyAttendance(detail.Id, attendanceType.Id, this.scheduleId, element.Id, detail.Day).subscribe(result => {
      if(result) {
        const parentI = this.dataSource.data.indexOf(this.dataSource.data.find(x => x.Id == element.Id)!);
        const childI = this.dataSource.data[parentI].DailyAttendances.indexOf(this.dataSource.data[parentI].DailyAttendances.find(x => x.Id === detail.Id)!);
        this.dataSource.data[parentI].DailyAttendances[childI] = result;
        this.dataSource.data = [...this.dataSource.data];
      }
    })
  }

  editDailyAttendanceShift(index: number, element: DailyAttendanceByStaff, detail: DailyAttendanceInfo, shift: any) {
    this.confirm.open('Changing Shift may lead to inconvenient schedule. Proceed?').pipe(
      filter(result => result),
      exhaustMap(() => {
        return this.scheduleDetailService.editDailyAttendanceShift(detail.Id, shift.Id, this.scheduleId, element.Id, detail.Day)
      })
    ).subscribe(result => {
      if(result) {
        const parentI = this.dataSource.data.indexOf(this.dataSource.data.find(x => x.Id == element.Id)!);
        const childI = this.dataSource.data[parentI].DailyAttendances.indexOf(this.dataSource.data[parentI].DailyAttendances.find(x => x.Id === detail.Id)!);
        this.dataSource.data[parentI].DailyAttendances[childI] = result;
        this.dataSource.data = [...this.dataSource.data];
      }
    })
  }
  undoDailyAttendance(index: number,element: DailyAttendanceByStaff,detail: DailyAttendanceInfo) {

    this.dialog
    .open(AttendanceHistoryComponent,{data:{dailyAttendance: detail, staffName: element.Name}, panelClass: 'backup-dialog'})
    .afterClosed()
    .pipe(
      filter(x => x),
      exhaustMap(result => {
        return this.scheduleDetailService.undoDailyAttendance(result, false, this.scheduleId, element.Id, detail.Day)
      })
    ).subscribe(result => {
      if(result) {
        const parentI = this.dataSource.data.indexOf(this.dataSource.data.find(x => x.Id == element.Id)!);
        const childI = this.dataSource.data[parentI].DailyAttendances.indexOf(this.dataSource.data[parentI].DailyAttendances.find(x => x.Id === detail.Id)!);
        this.dataSource.data[parentI].DailyAttendances[childI] = result as DailyAttendanceInfo;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }
  getContrast(hex: string):string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!result) {
      return '';
    }
    return (parseInt(result[1], 16) * 0.299 + parseInt(result[2], 16) * 0.587 + parseInt(result[3], 16) * 0.114) > 150 ?
    '#000000' : '#ffffff';
  }
  copyAttendance(element: DailyAttendanceByStaff,detail: DailyAttendanceInfo) {
    this.copiedAttendance = detail.Id;
    this.sbRef = this.snackBar
    .openFromComponent(AttendanceCopyComponent, {data: {element, detail, selected: this.selectedDetails, scheduleId: this.scheduleId, isAll: this.haveAll},panelClass: 'sb-extra-width', verticalPosition: 'top'})
    this.sbRef.afterDismissed().subscribe(info =>
      {

        this.copiedAttendance = null;
        if(info?.dismissedByAction) {
          this.selectedDetails.forEach(detailIndex => {
            var parentI = this.dataSource.data.indexOf(this.dataSource.data.find(x => x.DailyAttendances.map(y => y.Id).includes(detailIndex))!);
            var childI = this.dataSource.data[parentI].DailyAttendances.indexOf(this.dataSource.data[parentI].DailyAttendances.find(x => x.Id === detailIndex)!);
            this.dataSource.data[parentI].DailyAttendances[childI] = detail;
          });
          this.dataSource.data = [...this.dataSource.data];
        }
        this.selectedDetails = [];
      })
  }
  elementMouseDown(dailyAttendances: DailyAttendanceInfo[],day: Date) {
    if(!this.copiedAttendance) {
      return;
    }
    // if(!this.haveAccess) {
    //   return;
    // }
    const detail = this.getAttendanceTime(dailyAttendances, day);
    this.isMouseDown = true;
    const available = this.selectedDetails.find(x => x === detail!.Id);
    if(available) {
      this.isAddingDetail = false;
      this.selectedDetails.splice(this.selectedDetails.indexOf(available),1);
    } else {
      this.isAddingDetail = true;
      this.selectedDetails.push(detail!.Id);
      console.log(this.selectedDetails);
    }
  }
  elementHover(dailyAttendances: DailyAttendanceInfo[],day: Date) {
    // if(!this.haveAccess) {
    //   return;
    // }
    if(!this.copiedAttendance) {
      return;
    }
    const detail = this.getAttendanceTime(dailyAttendances, day);
    const available = this.selectedDetails.find(x => x === detail!.Id);
    if(this.isAddingDetail) {
      if(available) {
        return;
      }
      else {
        this.selectedDetails.push(detail!.Id);
      }
    } else {
      if(available) {
        this.selectedDetails.splice(this.selectedDetails.indexOf(available),1);
      } else {
        return;
      }
    }
    console.log(this.selectedDetails);
    //this.canCopyPaste = this.selectedElements.map(x => x.DailyAttendanceId).filter(this.onlyUnique).length === 1;
  }
  isSelected(dailyAttendances: DailyAttendanceInfo[],day: Date): number {
    return this.selectedDetails.find(x => x === this.getAttendanceTime(dailyAttendances, day)?.Id)!;
  }
  ngOnDestroy(): void {
      this.sbRef?.dismiss();
  }

}

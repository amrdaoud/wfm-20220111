import { HostListener, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { exhaustMap, filter, Observable, switchMap, tap, BehaviorSubject } from 'rxjs';
import { DailyAttendance, DailyAttendanceInfo, DailyScheduleAttendanceByStaff, ScheduleDetailManipulate } from 'src/app/app-models/schedule-details';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { AttendanceHistoryComponent } from '../attendance-history/attendance-history.component';

@Injectable()
export class ScheduleManipulationService {
  isAddingDetail = false;
  isLoading = this.scheduleDetailService.statusAttendance;
  activities = this.scheduleDetailService.activities;
  copiedActivitiesSubject = new BehaviorSubject<ScheduleDetailManipulate[]>([]);
  isLoadingDetails = this.scheduleDetailService.statusDetails;
  isLoadingAddDetails = this.scheduleDetailService.statusDetailsAdd;
  isLoadingAttendance = this.scheduleDetailService.statusEditingAttendance;

  constructor(private scheduleDetailService: ScheduleDetailService,
              private dialog: MatDialog,
              private confirm: ConfirmService) { }
  addDays(currentDay: Date, days: number): Date {
    return new Date(currentDay.getTime() + (days) * (1000 * 60 * 60 * 24));
  }
  undoAttendance(element: DailyAttendance, staffName: string, scheduleId: number, staffId: number)
  :Observable<DailyAttendance | DailyAttendanceInfo>{
   return this.dialog
    .open(AttendanceHistoryComponent,{data:{dailyAttendance: element, staffName: staffName}, panelClass: 'backup-dialog'})
    .afterClosed()
    .pipe(
      filter(x => x),
      exhaustMap(result => {
        return this.scheduleDetailService.undoDailyAttendance(result, true, scheduleId, staffId, element.Day)
      })
    );
  }
  // elementMouseDown(element: DailyAttendance, intervalId: number, index: number) {

  //   const available = this.selectedElements.find(x => x.DailyAttendanceId === element.Id && x.IntervalId === intervalId);
  //   if(available) {
  //     this.isAddingDetail = false;
  //     this.selectedElements.splice(this.selectedElements.indexOf(available),1);
  //   } else {
  //     this.isAddingDetail = true;
  //     this.selectedElements.push({DailyAttendanceId: element.Id, IntervalId: intervalId});
  //   }
  // }
  // elementHover(element: DailyAttendance, intervalId: number, index: number) {
  //   const available = this.selectedElements.find(x => x.DailyAttendanceId === element.Id && x.IntervalId === intervalId);
  //   if(this.isAddingDetail) {
  //     if(available) {
  //       return;
  //     }
  //     else {
  //       this.selectedElements.push({DailyAttendanceId: element.Id, IntervalId: intervalId});
  //     }
  //   } else {
  //     if(available) {
  //       this.selectedElements.splice(this.selectedElements.indexOf(available),1);
  //     } else {
  //       return;
  //     }
  //   }
  // }
  editScheduleDetailsPerStaff(selectedElements: ScheduleDetailManipulate[], activityId: number, staffId:number, scheduleId:number): Observable<DailyAttendance[]> {
    return this.scheduleDetailService.manipulateScheduleDetailsPerStaff(
      {ActivityId: activityId, ScheduleDetailsManipulate: (selectedElements as ScheduleDetailManipulate[])},
      staffId,
      scheduleId
      );
  }
  editScheduleDetailsPerDay(selectedElements: ScheduleDetailManipulate[], activityId: number, day:Date, scheduleId:number): Observable<DailyScheduleAttendanceByStaff[]> {
    return this.scheduleDetailService.manipulateScheduleDetailsPerDay(
      {ActivityId: activityId, ScheduleDetailsManipulate: (selectedElements as ScheduleDetailManipulate[])},
      day,
      scheduleId
      );
  }
  deleteScheduleDetailsPerStaff(selectedElements: ScheduleDetailManipulate[], staffId: number, scheduleId: number):Observable<DailyAttendance[]> {
    return this.confirm.open('Are you sure you want to delete selected intervals?').pipe(
      filter(x => x),
      switchMap(() => {
        return this.scheduleDetailService.manipulateScheduleDetailsPerStaff(
          {ActivityId: 0, ScheduleDetailsManipulate: (selectedElements as ScheduleDetailManipulate[])},
          staffId,
          scheduleId
          )
      })
    );
  }
  deleteScheduleDetailsPerDay(selectedElements: ScheduleDetailManipulate[], day: Date, scheduleId: number):Observable<DailyScheduleAttendanceByStaff[]> {
    return this.confirm.open('Are you sure you want to delete selected intervals?').pipe(
      filter(x => x),
      switchMap(() => {
        return this.scheduleDetailService.manipulateScheduleDetailsPerDay(
          {ActivityId: 0, ScheduleDetailsManipulate: (selectedElements as ScheduleDetailManipulate[])},
          day,
          scheduleId
          )
      })
    );
  }

  changeCopiedActivities(scheduleDetailManipulate: ScheduleDetailManipulate[]) {
    this.copiedActivitiesSubject.next(scheduleDetailManipulate);
  }
  get copiedActivities(): Observable<ScheduleDetailManipulate[]> {
    return this.copiedActivitiesSubject.asObservable();
  }



}

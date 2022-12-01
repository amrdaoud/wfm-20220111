import { WeekDay } from '@angular/common';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter,Subject, switchMap, takeUntil } from 'rxjs';
import { AttendanceApprovalModel} from 'src/app/app-models/day-offs';
import { DayOffService } from 'src/app/app-services/day-offs/day-off.service';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { ShiftService } from 'src/app/app-services/shifts-and-activities/shift.service';

@Component({
  selector: 'app-admin-approval-list',
  templateUrl: './admin-approval-list.component.html',
  styleUrls: ['./admin-approval-list.component.css']
})

export class AdminApprovalListComponent implements OnInit, OnDestroy {
  approvedData = this.dayOffService.approvedData();
  needApprovalData = this.dayOffService.needApprovalData();
  isLoading = this.dayOffService.status();
  shiftsObservable = this.transportationService.transportations();
  isLoadingShifts = this.transportationService.status();
  attendanceTypesObservable = this.dayOffService.attendanceTypes();
  loadingEditItems = this.dayOffService.LoadingEditItems();
  loadingApproveItems = this.dayOffService.loadingApproveItems();
  isLoadingTypes = this.dayOffService.typeStatus();
  isLoadingCreating = this.dayOffService.creatingStatus();
  reportResult = this.dayOffService.reportData();
  stop$ = new Subject<boolean>();
  constructor(private dayOffService: DayOffService,
              // private shiftService: ShiftService,
              private transportationService: TransportationService,
              private snackBar: MatSnackBar,
              private confirm: ConfirmService) {}
  ngOnInit(): void {
    this.dayOffService.getUserChoices().pipe(takeUntil(this.stop$)).subscribe();
  }

  approve(model: AttendanceApprovalModel) {
    this.dayOffService.approve(model).subscribe();
  }

  edit(model: AttendanceApprovalModel) {
    this.dayOffService.edit(model).subscribe()
  }

  createAttendance() {
    this.confirm.open(`Are you sure you want to generate Daily Attendance`).pipe(
      filter(x => x),
      switchMap(() => {
        return this.dayOffService.createAttendance()
      })
    ).subscribe(x => {
      this.snackBar.open('Attendance Created', 'Dismiss')
    })
  }
  ngOnDestroy(): void {
      this.stop$.next(true);
      this.stop$.complete();
  }

}

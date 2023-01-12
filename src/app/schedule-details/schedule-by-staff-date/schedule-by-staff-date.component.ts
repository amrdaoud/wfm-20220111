import { InitialService } from 'src/app/app-services/root-services/initial.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap, switchMap, Observable } from 'rxjs';
import { DailyAttendance, ScheduleByStaff } from 'src/app/app-models/schedule-details';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';
import { ScheduleManipulationService } from '../shared-elements/schedule-manipulation.service';
import { ScheduleDetailsTableComponent } from '../shared-elements/schedule-details-table/schedule-details-table.component';

@Component({
  selector: 'app-schedule-by-staff-date',
  templateUrl: './schedule-by-staff-date.component.html',
  styleUrls: ['./schedule-by-staff-date.component.css'],
  //providers:[ScheduleManipulationService]
})
export class ScheduleByStaffDateComponent implements OnInit {
isNextDisabled = false;
isPreviousDisabled = true;
haveAccess = false;
staffName!: string;
dataSource = new MatTableDataSource<DailyAttendance>();
scheduleId!: number;
staffId!: number;
day!: Date;
@ViewChild(ScheduleDetailsTableComponent) scheduleComponent!: ScheduleDetailsTableComponent;
  constructor(private scheduleDetailService: ScheduleDetailService,
              private route: ActivatedRoute,
              private router: Router,
              private initialService: InitialService,
              private manipulationService: ScheduleManipulationService) { }
scheduleDetailObservable!: Observable<ScheduleByStaff>;
adherenceByStaff!: Observable<number | null>;
  ngOnInit(): void {
    this.initialService.inRoles(['Hos', 'Admin']).subscribe(x => this.haveAccess = x);
    this.route.paramMap.pipe(
      tap((p: ParamMap) => {
        this.scheduleId = +p.get('scheduleId')!;
        this.staffId = +p.get('staffId')!
        this.day = new Date(p.get('day')!)
      }),
      switchMap(() => {
        return this.scheduleDetailService.getScheduleByStaffDate(this.scheduleId,this.staffId,this.day);
      })
    ).subscribe(result => {
      if(new Date(result.ScheduleStartDate).getTime() === this.day.getTime()) {
        this.isPreviousDisabled = true;
      }
      else {
        this.isPreviousDisabled = false;
      }
      if(new Date(result.ScheduleEndDate).getTime() === this.day.getTime()) {
        this.isNextDisabled = true;
      }
      else {
        this.isNextDisabled = false;
      }
      this.dataSource = new MatTableDataSource(result.DailyAttendances);
      this.staffName = result.Name;
    })
  }
  nextDay() {
    this.router.navigate(['/schedule-details/daily-attendance',
    this.scheduleId,
    'by-staff-date',
    this.staffId,
    this.manipulationService.addDays(this.day, 1).toDateString()]);
    this.scheduleComponent.selectedElements = [];
  }
  previousDay() {
    this.router.navigate(['/schedule-details/daily-attendance',
    this.scheduleId,
    'by-staff-date',
    this.staffId,
    this.manipulationService.addDays(this.day, -1).toDateString()]);
    this.scheduleComponent.selectedElements = [];
  }
  goBack() {
    this.router.navigateByUrl(`/schedule-details/daily-attendance/${this.scheduleId}`);
  }
}

import { Activity } from './../../app-models/ShiftsAndActivities';
import { ActivityService } from './../../app-services/shifts-and-activities/activity.service';
import { ScheduleManipulationService } from './../shared-elements/schedule-manipulation.service';
import { InitialService } from 'src/app/app-services/root-services/initial.service';
import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, delay, distinctUntilChanged, merge, startWith, switchMap, tap, filter, finalize } from 'rxjs';
import { DailyScheduleAttendanceByStaff, ScheduleByDay, ScheduleDetailManipulate } from 'src/app/app-models/schedule-details';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';

@Component({
  selector: 'app-schedule-by-date',
  templateUrl: './schedule-by-date.component.html',
  styleUrls: ['./schedule-by-date.component.css']
})
export class ScheduleByDateComponent implements AfterViewInit {
  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseup() {
      this.isMouseDown = false;
  }
  dataSource = new MatTableDataSource<DailyScheduleAttendanceByStaff>();
  isLoading = this.scheduleDetailService.statusAttendance;
  scheduleId!: number;
  day!: Date;
  dataSize!: number;
  haveAll = this.route.snapshot.url.map(x => x.path).includes('all');
  data!: ScheduleByDay;
  isMouseDown = false;
isAddingDetail = this.manipulationService.isAddingDetail;
  selectedElements: ScheduleDetailManipulate[] = [];
  activities = this.scheduleDetailService.activities;
  isLoadingDetails = this.scheduleDetailService.statusDetails;
  isLoadingAddDetails = this.scheduleDetailService.statusDetailsAdd;
  isLoadingAttendance = this.scheduleDetailService.statusEditingAttendance;
  intervalsObservable = this.scheduleDetailService.involvedIntervals.pipe(
    tap(x => {
      this.columns = ['Name','Adherence', ...x.map(z => z.Id.toString())]
    })
  );
  columns!: any[];
  hourColumns!: any[];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterControl = new FormControl('');
  activityControl = new FormControl('');
  typeControl = new FormControl('Staff');
  haveAccess = false;
  isHos = this.initialService.inRoles(['Hos']);
  isAdmin = this.initialService.inRoles(['Admin']);
  isSuper = this.initialService.inRoles(['SuperUser']);
  isUser = this.initialService.inRoles(['User']);

  constructor(private scheduleDetailService:ScheduleDetailService,
              private route: ActivatedRoute,
              private router: Router,
              private initialService: InitialService,
              private manipulationService: ScheduleManipulationService) { }

    get selectedActivity(): Activity {
      return this.activityControl.value;
    }

    ngAfterViewInit(): void {
    this.activities.subscribe(x => this.activityControl.setValue(x[0]));
    this.initialService.inRoles(['Hos', 'Admin']).subscribe(x => this.haveAccess = x);
    this.filterControl.valueChanges.subscribe(() => (this.paginator ? this.paginator.pageIndex = 0 : ''));
    const pageSearchChanges = merge(this.paginator.page,
      this.typeControl.valueChanges.pipe(
        filter(() => this.filterControl.value),
        tap(() => this.paginator.pageIndex = 0)
      ),
      this.filterControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      tap(() => this.paginator.pageIndex = 0)
      ),
      this.activityControl.valueChanges.pipe(
        filter(x => x),
        filter(() => this.filterControl.value),
        tap(() => this.paginator.pageIndex = 0)
      )).pipe(
        tap(x => {}),
        startWith({}),

        switchMap(() => {
          if(this.haveAll) {
            return this.scheduleDetailService.getScheduleByDateAll(this.scheduleId,this.day,this.paginator.pageIndex, this.paginator.pageSize,
              this.typeControl.value  === 'Activity Time' ? `${this.selectedActivity.Id}-${this.filterControl.value}` : this.filterControl.value, this.typeControl.value)
          }
          return this.scheduleDetailService.getScheduleByDate(this.scheduleId,this.day,this.paginator.pageIndex, this.paginator.pageSize,
              this.typeControl.value  === 'Activity Time' ? `${this.selectedActivity.Id}-${this.filterControl.value}` : this.filterControl.value, this.typeControl.value)
        })
      );
      this.route.paramMap.pipe(
        delay(0),
        tap((p: ParamMap) => {
          this.scheduleId = +p.get('scheduleId')!
          this.day = new Date(p.get('day')!)
        }),
        switchMap(() => {
          return pageSearchChanges;
        })
      ).subscribe(result => {
         this.dataSource = new MatTableDataSource(result.Result.DailyAttendances);
         this.data = result.Result;
         this.dataSize = result?.Size;

        })
  }
  // getActivity(scheduleDetails: ScheduleDetail[],intervalId: number) {
  //   return scheduleDetails.find(x => x.IntervalId === intervalId);
  // }
  goBack() {
    this.router.navigateByUrl(`/schedule-details/daily-attendance/${this.scheduleId}`);
  }


  elementMouseDown(element: DailyScheduleAttendanceByStaff, intervalId: number, index: number) {
    if(!this.haveAccess) {
      return;
    }
    this.isMouseDown = true;
    const available = this.selectedElements.find(x => x.DailyAttendanceId === element.AttendanceId && x.IntervalId === intervalId);
    if(available) {
      this.isAddingDetail = false;
      this.selectedElements.splice(this.selectedElements.indexOf(available),1);
    } else {
      this.isAddingDetail = true;
      this.selectedElements.push({DailyAttendanceId: element.AttendanceId, IntervalId: intervalId});
    }
  }
  elementHover(element: DailyScheduleAttendanceByStaff, intervalId: number, index: number) {
    if(!this.haveAccess) {
      return;
    }
    const available = this.selectedElements.find(x => x.DailyAttendanceId === element.AttendanceId && x.IntervalId === intervalId);
    if(this.isAddingDetail) {
      if(available) {
        return;
      }
      else {
        this.selectedElements.push({DailyAttendanceId: element.AttendanceId, IntervalId: intervalId});
      }
    } else {
      if(available) {
        this.selectedElements.splice(this.selectedElements.indexOf(available),1);
      } else {
        return;
      }
    }
  }
  editScheduleDetails(activityId: number) {
    this.manipulationService.editScheduleDetailsPerDay(this.selectedElements, activityId,this.day, this.scheduleId)
    .pipe(
      finalize(() =>  this.selectedElements = [])
    )
    .subscribe(result => {
        if(result) {
          result.forEach(element => {
            var available = this.dataSource.data.find(x => x.Id == element.Id)!;
            var index = this.dataSource.data.indexOf(available);
            this.dataSource.data[index] = element
          });
          this.dataSource.data = [...this.dataSource.data];
        }
      })
  }
  deleteScheduleDetails() {
    this.manipulationService.deleteScheduleDetailsPerDay(this.selectedElements, this.day, this.scheduleId)
    .pipe(
      finalize(() =>  this.selectedElements = [])
    )
    .subscribe(result => {
        if(result) {
          result.forEach(element => {
            var available = this.dataSource.data.find(x => x.Id == element.Id)!;
            var index = this.dataSource.data.indexOf(available);
            this.dataSource.data[index] = element
          });
          this.dataSource.data = [...this.dataSource.data];
        }
      })
  }
  isSelected(dailyAttendanceId: number, intervalId: number): boolean {
    return this.selectedElements.map(x => x.DailyAttendanceId + '-' + x.IntervalId).includes(dailyAttendanceId + '-' + intervalId)
  }

}

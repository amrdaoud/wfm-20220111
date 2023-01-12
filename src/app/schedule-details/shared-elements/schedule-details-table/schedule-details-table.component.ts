import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  tap, finalize } from 'rxjs';
import { AttendanceType } from 'src/app/app-models/attendance-types';
import { Transportation } from 'src/app/app-models/resources';
import { DailyAttendance, ScheduleDetailManipulate } from 'src/app/app-models/schedule-details';
import { Activity } from 'src/app/app-models/ShiftsAndActivities';
import { AttendancePatternService } from 'src/app/app-services/attendance-pattern.service';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';

import { ScheduleManipulationService } from '../schedule-manipulation.service';

@Component({
  selector: 'app-schedule-details-table',
  templateUrl: './schedule-details-table.component.html',
  styleUrls: ['./schedule-details-table.component.css'],
})
export class ScheduleDetailsTableComponent implements OnInit {
@HostListener('mouseup')
@HostListener('mouseleave')
onMouseup() {
  this.isMouseDown = false;
}
@Input() scheduleId!: number;
@Input() staffId!: number;
@Input() staffName!: string;
@Input() dataSource = new MatTableDataSource<DailyAttendance>();
@Input() haveAccess = false;
@Input() autoSelect = false;
canCopyPaste = false;
selectedElements: ScheduleDetailManipulate[] = [];
isLoading = this.manipulationService.isLoading;
activities = this.manipulationService.activities;
columns!: any[];
copiedActivities = this.manipulationService.copiedActivities;
isLoadingDetails = this.manipulationService.isLoadingAttendance
isLoadingAddDetails = this.manipulationService.isLoadingAddDetails;
isLoadingAttendance = this.manipulationService.isLoadingAttendance;
isMouseDown = false;
isAddingDetail = this.manipulationService.isAddingDetail;
frm = new FormGroup({
  StartInterval: new FormControl('', Validators.required),
  EndInterval: new FormControl('', Validators.required)
})
intervalsObservable = this.scheduleDetailService.involvedIntervals.pipe(
  tap(x => {
    this.columns = ['Day','Adherence', ...x.map(z => z.Id.toString())]
  })
);

  constructor(private router: Router,
              private manipulationService: ScheduleManipulationService,
              private scheduleDetailService: ScheduleDetailService,
              private patternService: AttendancePatternService
              ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.selectedElements = [];
    });
  }
  get startInterval(): number {
    return this.frm.value.StartInterval;
  }
  get endInterval(): number {
    return this.frm.value.EndInterval;
  }
  undoAttendance(element: DailyAttendance, i: number) {
    if(!this.haveAccess) {
      return;
    }
    this.selectedElements = [];
    this.manipulationService.undoAttendance(element, this.staffName, this.scheduleId, this.staffId)
    .subscribe(result => {
      if(result) {
        this.dataSource.data[i] = (result as DailyAttendance);
        this.dataSource.data = [...this.dataSource.data];
        this.selectedElements = [];
      }
    });
  }
  elementMouseDown(element: DailyAttendance, intervalId: number, ActivityId: number,ActivityName: string, ActivityColor: string, index: number) {
    if(!this.haveAccess) {
      return;
    }
    this.isMouseDown = true;
    const available = this.selectedElements.find(x => x.DailyAttendanceId === element.Id && x.IntervalId === intervalId);
    if(available) {
      this.isAddingDetail = false;
      this.selectedElements.splice(this.selectedElements.indexOf(available),1);
    } else {
      this.isAddingDetail = true;
      this.selectedElements.push({DailyAttendanceId: element.Id, IntervalId: intervalId, ActivityId,ActivityName,ActivityColor });
    }
    this.canCopyPaste = this.selectedElements.map(x => x.DailyAttendanceId).filter(this.onlyUnique).length === 1;
  }
  elementHover(element: DailyAttendance, intervalId: number,ActivityId: number,ActivityName: string, ActivityColor: string, index: number) {
    if(!this.haveAccess) {
      return;
    }
    const available = this.selectedElements.find(x => x.DailyAttendanceId === element.Id && x.IntervalId === intervalId);
    if(this.isAddingDetail) {
      if(available) {
        return;
      }
      else {
        this.selectedElements.push({DailyAttendanceId: element.Id, IntervalId: intervalId, ActivityId, ActivityName, ActivityColor});
      }
    } else {
      if(available) {
        this.selectedElements.splice(this.selectedElements.indexOf(available),1);
      } else {
        return;
      }
    }
    this.canCopyPaste = this.selectedElements.map(x => x.DailyAttendanceId).filter(this.onlyUnique).length === 1;
  }
  editScheduleDetails(activity: Transportation | AttendanceType | Activity) {
    if((activity as Activity).NeedBackup) {
      this.patternService.getEligibleStaffMembers(this.selectedElements).subscribe(x => console.log(x))
    }
    // this.manipulationService.editScheduleDetailsPerStaff(this.selectedElements, activity.Id,this.staffId, this.scheduleId)
    // .pipe(
    //   finalize(() =>  this.selectedElements = [])
    // )
    // .subscribe(result => {
    //     if(result) {
    //       result.forEach(element => {
    //         var available = this.dataSource.data.find(x => x.Id == element.Id)!;
    //         var index = this.dataSource.data.indexOf(available);
    //         this.dataSource.data[index] = element
    //       });
    //       this.dataSource.data = [...this.dataSource.data];
    //     }
    //   })
  }
  deleteScheduleDetails() {
    this.manipulationService.deleteScheduleDetailsPerStaff(this.selectedElements, this.staffId, this.scheduleId)
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

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  changeCopied() {
    if(!this.canCopyPaste) {
      return;
    }
    this.manipulationService.changeCopiedActivities([...this.selectedElements.sort((a,b) => a.IntervalId - b.IntervalId)]);
    this.selectedElements = [];
  }
  clearCopied() {
    this.manipulationService.changeCopiedActivities([]);
  }
  selectIntervals() {
    this.selectedElements = [];
    const dailyAttendancesId = this.dataSource.data.map(x => x.Id).filter(this.onlyUnique);
    this.intervalsObservable.subscribe(x => {
      dailyAttendancesId.forEach(id => {
        x.filter(y => y.Id >= this.startInterval && y.Id <= this.endInterval).forEach(i => {
          this.selectedElements.push({DailyAttendanceId: id, IntervalId: i.Id})
        })
      })
    })
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceType } from 'src/app/app-models/attendance-types';
import { ActivityService } from 'src/app/app-services/shifts-and-activities/activity.service';
import { AttendanceTypeService } from 'src/app/app-services/shifts-and-activities/attendance-type.service';

@Component({
  selector: 'app-attendance-type-add',
  templateUrl: './attendance-type-add.component.html',
  styleUrls: ['./attendance-type-add.component.css']
})
export class AttendanceTypeAddComponent implements OnInit {
  frm = this.attendanceTypeService.createForm(this.model);
  isCheckingName = this.attendanceTypeService.isCkeckingName;
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Attendance Type';
  activitiesSubject = this.activityService.activities();
  isLoadingActivities = this.activityService.status();
  constructor(@Inject(MAT_DIALOG_DATA) private model: AttendanceType,
              private attendanceTypeService:AttendanceTypeService,
              private dialogRef: MatDialogRef<AttendanceTypeAddComponent>,
              private activityService: ActivityService) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}

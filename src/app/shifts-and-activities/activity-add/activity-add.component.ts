import { Activity } from './../../app-models/ShiftsAndActivities';
import { ActivityService } from './../../app-services/shifts-and-activities/activity.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.css']
})
export class ActivityAddComponent implements OnInit {
  frm = this.activityService.createForm(this.model);
  isCheckingName = this.activityService.isCkeckingName;
  isCheckingColor = this.activityService.isCkeckingColor;
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Activity';
  constructor(@Inject(MAT_DIALOG_DATA) private model: Activity,
              private activityService:ActivityService,
              private dialogRef: MatDialogRef<ActivityAddComponent>) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}

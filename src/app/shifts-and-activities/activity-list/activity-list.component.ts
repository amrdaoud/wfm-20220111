import { ActivityAddComponent } from './../activity-add/activity-add.component';
import { activityColumns, Activity } from './../../app-models/ShiftsAndActivities';
import { ActivityService } from './../../app-services/shifts-and-activities/activity.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  observableData = this.activityService.activities();
  isLoading = this.activityService.status();
  columnsDef = activityColumns;
  constructor(private activityService: ActivityService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openActivity(model?: Activity) {
    this.dialog.open(ActivityAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.activityService.edit(model.Id, result);
        }
        else {
          this.activityService.add(result);
        }
      }
    })
  }

}

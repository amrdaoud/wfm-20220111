import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { ScheduleWithRulesBinding, ShiftRule } from 'src/app/app-models/schedules';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {
frm = this.scheduleService.createForm(this.model);
isCheckingName = this.scheduleService.isCheckingName;
newOrUpdate = this.model?.ScheduleData ? `#${this.model.ScheduleData.Id} Edit` : 'New Schedule';
myFilter = (d: Date | null): boolean => {
  return new Date(d?.toDateString()!) >= new Date(new Date().toDateString());
};
  constructor(@Inject(MAT_DIALOG_DATA) public model: ScheduleWithRulesBinding,
              private scheduleService:ScheduleService,
              private dialogRef: MatDialogRef<ScheduleAddComponent>,
              private confirm: ConfirmService
              ) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    // const newSchedule = this.frm.getRawValue().ScheduleData as Schedule;
    // const newRules = this.frm.getRawValue()?.ShiftRuleData as ShiftRule;
    if(this.model.ScheduleData) {
      this.confirm.open(`Daily Attendance for schedule ${this.model.ScheduleData.Name} may be deleted. Do you want to continue`).pipe(
        filter(x => x),
        tap(() => {
          this.dialogRef.close(this.frm.getRawValue());
        })
      ).subscribe();
    }
    else {
      this.dialogRef.close(this.frm.getRawValue());
    }


  }

  get ScheduleDataForm(): FormGroup {
    return this.frm.get('ScheduleData') as FormGroup;
  }

}

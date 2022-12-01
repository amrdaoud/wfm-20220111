import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { DailyAttendance, DailyAttendanceBackup } from 'src/app/app-models/schedule-details';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css']
})
export class AttendanceHistoryComponent implements OnInit {
isLoading = this.scheduleDetailService.statusBackups;
dataSource = new MatTableDataSource<DailyAttendanceBackup>();
idControl = new FormControl('', Validators.required);
intervalsObservable = this.scheduleDetailService.involvedBackupIntervals.pipe(
  tap(x => {
    this.columns = ['Action','Type', ...x.map(z => z.Id.toString())]
    this.hourColumns = ['Action','Type', ...x.map(z => z.TimeMap).filter(this.onlyUnique)]
  })
);
columns!: any[];
hourColumns!: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public attendance: {dailyAttendance : DailyAttendance, staffName: string},
              private scheduleDetailService: ScheduleDetailService,
              private confirm: ConfirmService,
              private dialogRef: MatDialogRef<AttendanceHistoryComponent>) { }

  ngOnInit(): void {
    this.scheduleDetailService.getDailyAttendanceBackups(this.attendance.dailyAttendance.Id).subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
    });
  }

  onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }
  submit() {
    if(this.idControl.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to restore attendance?').subscribe(x => {
      if(x) {
        this.dialogRef.close(this.idControl.value)
      }
    })
  }

}

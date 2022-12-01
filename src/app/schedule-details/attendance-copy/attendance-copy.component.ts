import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DailyAttendanceByStaff, DailyAttendanceInfo } from 'src/app/app-models/schedule-details';
import { ScheduleDetailService } from 'src/app/app-services/schedule-details/schedule-detail.service';

@Component({
  selector: 'app-attendance-copy',
  templateUrl: './attendance-copy.component.html',
  styleUrls: ['./attendance-copy.component.css']
})
export class AttendanceCopyComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {element: DailyAttendanceByStaff ,detail: DailyAttendanceInfo, selected: number[], scheduleId: number, isAll: boolean },
              private snackBarRef: MatSnackBarRef<AttendanceCopyComponent>,
              private scheduleDetailService: ScheduleDetailService) { }

  ngOnInit(): void {
  }
  close() {
    this.snackBarRef.dismiss();
  }
  paste() {
    this.scheduleDetailService.copyAttendance(this.data.detail.Id, this.data.selected, this.data.isAll, this.data.scheduleId)
    .subscribe(
      () => this.snackBarRef.dismissWithAction()
    )
  }

}

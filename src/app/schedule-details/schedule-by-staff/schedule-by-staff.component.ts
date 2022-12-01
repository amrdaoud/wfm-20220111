
import { InitialService } from 'src/app/app-services/root-services/initial.service';
import { ScheduleDetailService } from './../../app-services/schedule-details/schedule-detail.service';
import { Component, OnInit } from '@angular/core';
import { DailyAttendance, ScheduleByStaff } from 'src/app/app-models/schedule-details';
import { Observable, switchMap, tap} from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-schedule-by-staff',
  templateUrl: './schedule-by-staff.component.html',
  styleUrls: ['./schedule-by-staff.component.css']
})
export class ScheduleByStaffComponent implements OnInit {
staffName!: string;
dataSource = new MatTableDataSource<DailyAttendance>();
scheduleId!: number;
staffId!: number;
haveAccess = false;
data!: ScheduleByStaff;
activities = this.scheduleDetailService.activities;
  constructor(private scheduleDetailService:ScheduleDetailService,
              private route: ActivatedRoute,
              private router: Router,
              private initialService: InitialService) { }
scheduleDetailObservable!: Observable<ScheduleByStaff>;
  ngOnInit(): void {
    this.initialService.inRoles(['Hos', 'Admin']).subscribe(x => this.haveAccess = x);
    this.route.paramMap.pipe(
      tap((p: ParamMap) => {
        this.scheduleId = +p.get('scheduleId')!;
        this.staffId = +p.get('staffId')!;
      }),
      switchMap(() => {
        return this.scheduleDetailService.getScheduleByStaff(this.scheduleId,this.staffId);
      })
    ).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.DailyAttendances);
      this.data = result;
      this.staffName = result.Name;
    })
  }
  goBack() {
    this.router.navigateByUrl(`/schedule-details/daily-attendance/${this.scheduleId}`);
  }



}

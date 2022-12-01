import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { InitialService } from 'src/app/app-services/root-services/initial.service';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';

@Component({
  selector: 'app-schedule-list-hos-user',
  templateUrl: './schedule-list-hos-user.component.html',
  styleUrls: ['./schedule-list-hos-user.component.css']
})
export class ScheduleListHosUserComponent implements OnInit {
  observableData = this.scheduleService.schedules();
  isLoading = this.scheduleService.status();
  isHos = this.initialService.user.pipe(
    map(u => {
      if(u.Roles.includes('Hos')) {
        return true;
      }
      return false;
    })
  )
  constructor(private scheduleService: ScheduleService,
              private initialService: InitialService) { }

  ngOnInit(): void {
  }

}

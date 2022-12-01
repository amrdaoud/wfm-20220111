import { ScheduleByStaffComponent } from './schedule-by-staff/schedule-by-staff.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { ScheduleByDateComponent } from './schedule-by-date/schedule-by-date.component';
import { ScheduleByStaffDateComponent } from './schedule-by-staff-date/schedule-by-staff-date.component';

const routes: Routes = [
  {path: 'daily-attendance/:scheduleId/by-staff/:staffId', component: ScheduleByStaffComponent},
  {path: 'daily-attendance/all/:scheduleId/by-staff/:staffId', redirectTo: 'daily-attendance/:scheduleId/by-staff/:staffId'},
  {path: 'daily-attendance/:scheduleId/by-date/:day', component: ScheduleByDateComponent},
  {path: 'daily-attendance/:scheduleId/by-staff-date/:staffId/:day', component: ScheduleByStaffDateComponent},
  {path: 'daily-attendance/all/:scheduleId/by-staff-date/:staffId/:day', redirectTo: 'daily-attendance/:scheduleId/by-staff-date/:staffId/:day'},
  {path: 'daily-attendance/:scheduleId', component: DailyAttendanceComponent},
  {path: 'daily-attendance/all/:scheduleId/by-date/:day', component: ScheduleByDateComponent},
  {path: 'daily-attendance/all/:scheduleId', component: DailyAttendanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleDetailsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { ScheduleListHosUserComponent } from './schedule-list-hos-user/schedule-list-hos-user.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [
  {path: '', component: ScheduleListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'my-schedules', component: ScheduleListHosUserComponent, data:{Roles: ['Hos', 'User']}, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }

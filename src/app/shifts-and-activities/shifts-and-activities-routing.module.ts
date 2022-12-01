import { ActivityListComponent } from './activity-list/activity-list.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceTypeListComponent } from './attendance-type-list/attendance-type-list.component';

const routes: Routes = [
  {path:'shifts', component: ShiftListComponent},
  {path:'activities', component: ActivityListComponent},
  {path:'attendance-types', component: AttendanceTypeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsAndActivitiesRoutingModule { }

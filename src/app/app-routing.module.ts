import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app-guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'resources',  loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule), data:{Roles: ['Admin','Hos']}, canActivate: [AuthGuard]},
  { path: 'shifts-activities',  loadChildren: () => import('./shifts-and-activities/shifts-and-activities.module').then(m => m.ShiftsAndActivitiesModule) , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  { path: 'schedules',  loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule) },
  { path: 'day-offs',  loadChildren: () => import('./day-offs/day-offs.module').then(m => m.DayOffsModule)},
  { path: 'forecasts',  loadChildren: () => import('./forecasts/forecasts.module').then(m => m.ForecastsModule) , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  { path: 'active-schedule',  loadChildren: () => import('./active-schedule/active-schedule.module').then(m => m.ActiveScheduleModule) , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  { path: 'schedule-details',  loadChildren: () => import('./schedule-details/schedule-details.module').then(m => m.ScheduleDetailsModule), data:{Roles: ['Admin', 'Hos', 'User']}, canActivate: [AuthGuard] },
  { path: 'swap-requests',  loadChildren: () => import('./swap-requests/swap-requests.module').then(m => m.SwapRequestsModule) , data:{Roles: ['User','Hos']}, canActivate: [AuthGuard]},
  { path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , data:{Roles: ['SuperUser']}, canActivate: [AuthGuard]},
  { path: 'analysis', loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule) , data:{Roles: ['SuperUser', 'Admin', 'Hos']}, canActivate: [AuthGuard]},
  { path: 'pre-schedule', loadChildren: () => import('./attendance-pattern/attendance-pattern.module').then(m => m.AttendancePatternModule) , data:{Roles: ['SuperUser', 'Admin', 'Hos']}, canActivate: [AuthGuard]},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ActivitiesReportComponent } from './activities-report/activities-report.component';
import { AdherenceReportComponent } from './adherence-report/adherence-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleDashboardComponent } from './schedule-dashboard/schedule-dashboard.component';

const routes: Routes = [
  {path: '', component: ScheduleDashboardComponent},
  {path: 'adherence', component: AdherenceReportComponent},
  {path: 'activities', component: ActivitiesReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }

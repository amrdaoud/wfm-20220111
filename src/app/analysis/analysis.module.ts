import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScheduleDashboardComponent } from './schedule-dashboard/schedule-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartsModule } from '../charts/charts.module';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { AdherenceByHosComponent } from './adherence-by-hos/adherence-by-hos.component';
import { AdherenceReportComponent } from './adherence-report/adherence-report.component';
import { AdherenceFilterComponent } from './adherence-filter/adherence-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivitiesReportComponent } from './activities-report/activities-report.component';

@NgModule({
  declarations: [
    DailyReportComponent,
    ScheduleDashboardComponent,
    LeaderBoardComponent,
    AdherenceByHosComponent,
    AdherenceReportComponent,
    AdherenceFilterComponent,
    ActivitiesReportComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    AnalysisRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatListModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    SharedModule
  ]
})
export class AnalysisModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScheduleListHosUserComponent } from './schedule-list-hos-user/schedule-list-hos-user.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleAddComponent,
    ScheduleListHosUserComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SharedModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule
  ]
})
export class SchedulesModule { }

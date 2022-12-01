import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsAndActivitiesRoutingModule } from './shifts-and-activities-routing.module';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftAddComponent } from './shift-add/shift-add.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { AttendanceTypeListComponent } from './attendance-type-list/attendance-type-list.component';
import { AttendanceTypeAddComponent } from './attendance-type-add/attendance-type-add.component';


@NgModule({
  declarations: [
    ShiftListComponent,
    ShiftAddComponent,
    ActivityListComponent,
    ActivityAddComponent,
    AttendanceTypeListComponent,
    AttendanceTypeAddComponent
  ],
  imports: [
    CommonModule,
    ShiftsAndActivitiesRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShiftsAndActivitiesModule { }

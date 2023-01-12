import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendancePatternRoutingModule } from './attendance-pattern-routing.module';
import { AttendancePatternListComponent } from './attendance-pattern-list/attendance-pattern-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { AttendancePatternUploadComponent } from './attendance-pattern-upload/attendance-pattern-upload.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PatternSummaryComponent } from './pattern-summary/pattern-summary.component';


@NgModule({
  declarations: [
    AttendancePatternListComponent,
    AttendancePatternUploadComponent,
    PatternSummaryComponent
  ],
  imports: [
    CommonModule,
    AttendancePatternRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSnackBarModule,
    FormsModule
  ]
})
export class AttendancePatternModule { }

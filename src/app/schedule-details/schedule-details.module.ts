import { AttendanceCopyComponent } from './attendance-copy/attendance-copy.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleDetailsRoutingModule } from './schedule-details-routing.module';
import { ScheduleByStaffComponent } from './schedule-by-staff/schedule-by-staff.component';
import { MatCardModule } from '@angular/material/card';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleByDateComponent } from './schedule-by-date/schedule-by-date.component';
import { MatMenuModule } from '@angular/material/menu';
import { ScheduleByStaffDateComponent } from './schedule-by-staff-date/schedule-by-staff-date.component';
import { AdherencePipe } from '../app-pipes/adherence.pipe';
import { AdherenceloaderPipe } from '../app-pipes/adherenceloader.pipe';
import { A11yModule } from '@angular/cdk/a11y';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { IntervalBoxComponent } from './shared-elements/interval-box/interval-box.component';
import { SelectableMenuComponent } from './shared-elements/selectable-menu/selectable-menu.component';
import { ScheduleDetailsTableComponent } from './shared-elements/schedule-details-table/schedule-details-table.component';
import { ScheduleManipulationService } from './shared-elements/schedule-manipulation.service';
import { SearchAutocompleteComponent } from './shared-elements/search-autocomplete/search-autocomplete.component';

@NgModule({
  declarations: [
    ScheduleByStaffComponent,
    DailyAttendanceComponent,
    ScheduleByDateComponent,
    ScheduleByStaffDateComponent,
    AdherencePipe,
    AdherenceloaderPipe,
    AttendanceHistoryComponent,
    IntervalBoxComponent,
    SelectableMenuComponent,
    ScheduleDetailsTableComponent,
    SearchAutocompleteComponent,
    AttendanceCopyComponent
  ],
  imports: [
    CommonModule,
    ScheduleDetailsRoutingModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatRadioModule,
    A11yModule,
    MatDialogModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers:[ScheduleManipulationService]
})
export class ScheduleDetailsModule { }

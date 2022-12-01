import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayOffsRoutingModule } from './day-offs-routing.module';
import { AdminApprovalListComponent } from './admin-approval-list/admin-approval-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MergePipe } from '../app-pipes/merge.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminApprovedComponent } from './admin-approved/admin-approved.component';
import { AdminNeedApprovalComponent } from './admin-need-approval/admin-need-approval.component';
import { ApprovedPipe } from '../app-pipes/approved.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserChoiceComponent } from './user-choice/user-choice.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatGridListModule } from '@angular/material/grid-list';
import { ApprovedSummaryComponent } from './approved-summary/approved-summary.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    AdminApprovalListComponent,
    MergePipe,
    ApprovedPipe,
    AdminApprovedComponent,
    AdminNeedApprovalComponent,
    UserChoiceComponent,
    ApprovedSummaryComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    DayOffsRoutingModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule
  ]
})
export class DayOffsModule { }

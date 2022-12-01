import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { LocationListComponent } from './location-list/location-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationAddComponent } from './location-add/location-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StaffMembersListComponent } from './staff-members-list/staff-members-list.component';
import { StaffMemberAddComponent } from './staff-member-add/staff-member-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StaffTypeListComponent } from './staff-type-list/staff-type-list.component';
import { StaffTypeAddComponent } from './staff-type-add/staff-type-add.component';
import { TransportationListComponent } from './transportation-list/transportation-list.component';
import { TransportationAddComponent } from './transportation-add/transportation-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeadOfSectionListComponent } from './head-of-section-list/head-of-section-list.component';
import { HeadOfSectionAddComponent } from './head-of-section-add/head-of-section-add.component';

@NgModule({
  declarations: [
    LocationListComponent,
    LocationAddComponent,
    StaffMembersListComponent,
    StaffMemberAddComponent,
    StaffTypeListComponent,
    StaffTypeAddComponent,
    TransportationListComponent,
    TransportationAddComponent,
    HeadOfSectionListComponent,
    HeadOfSectionAddComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class ResourcesModule { }

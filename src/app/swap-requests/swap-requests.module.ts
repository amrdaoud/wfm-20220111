import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapRequestsRoutingModule } from './swap-requests-routing.module';
import { SwapRequestListComponent } from './swap-request-list/swap-request-list.component';
import { SwapRequestDetailsComponent } from './swap-request-details/swap-request-details.component';
import { SwapRequestAddComponent } from './swap-request-add/swap-request-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    SwapRequestListComponent,
    SwapRequestDetailsComponent,
    SwapRequestAddComponent
  ],
  imports: [
    CommonModule,
    SwapRequestsRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule
  ]
})
export class SwapRequestsModule { }

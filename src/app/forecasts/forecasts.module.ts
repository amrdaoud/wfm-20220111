import { MatIconModule } from '@angular/material/icon';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { SharedModule } from './../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastsRoutingModule } from './forecasts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ForecastAddComponent } from './forecast-add/forecast-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ForecastListComponent,
    ForecastAddComponent,
    ForecastDetailsComponent
  ],
  imports: [
    CommonModule,
    ForecastsRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})
export class ForecastsModule { }

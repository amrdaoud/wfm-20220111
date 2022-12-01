import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BarChartComponent } from './bar-chart/bar-chart.component';



@NgModule({
  declarations: [
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    MatProgressSpinnerModule
  ],
  exports:[
    LineChartComponent,
    BarChartComponent
  ]
})
export class ChartsModule { }

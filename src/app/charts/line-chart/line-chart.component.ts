import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, of } from 'rxjs';
import { ChartService } from '../chart.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() labelsHandler!: string;
  @Input() valueHandlers!: string[];
  @Input() reportData!: Observable<any[]>;
  @Input() isLoading: Observable<boolean> = of(false);
  public lineChartData!: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'] = {maintainAspectRatio: false, responsive: true}
  public lineChartType: ChartType = 'line';
  constructor(private chartService: ChartService) { }
  ngOnInit(): void {
    this.reportData.subscribe(x => this.lineChartData = this.chartService.createChartData(x, this.labelsHandler, this.valueHandlers))
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Observable, of } from 'rxjs';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() labelsHandler!: string;
  @Input() valueHandlers!: string[];
  @Input() reportData!: Observable<any[]>;
  @Input() isLoading: Observable<boolean> = of(false);
  @Input() isPercent = false;
  public lineChartData!: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'] = {maintainAspectRatio: false, responsive: true}
  public lineChartType: ChartType = 'bar';
  constructor(private chartService: ChartService) { }
  ngOnInit(): void {
    this.reportData.subscribe(x => this.lineChartData = this.chartService.createChartData(x, this.labelsHandler, this.valueHandlers))
  }
}

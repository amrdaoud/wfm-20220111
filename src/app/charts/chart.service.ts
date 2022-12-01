import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  createChartData(reportData: any[], labelHandler: string, valueHandlers: string[]): ChartConfiguration['data'] {
    let chartData: ChartConfiguration['data'] = {
      labels: reportData.map(x => x[labelHandler]).filter(this.onlyUnique),
      datasets: this.createValueDataSet(reportData, valueHandlers)
    }
    return chartData;
  }
  private createValueDataSet(reportData: any[], valueHandlers: string[]): Array<{data: number[], label: string}> {
    let data = new Array<{data: number[], label: string}>();
    valueHandlers.forEach(element => {
      data.push({data: reportData.map(x => x[element]), label: element})
    })
    return data;
  }
  private onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
}

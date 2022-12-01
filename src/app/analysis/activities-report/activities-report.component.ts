import { AnalysisService } from './../../app-services/analysis/analysis.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { ActivitiesReportColumns, ActivitiesReportData } from 'src/app/app-models/analysis';
import { ColumnDef } from 'src/app/app-models/shared/table-config';

@Component({
  selector: 'app-activities-report',
  templateUrl: './activities-report.component.html',
  styleUrls: ['./activities-report.component.css']
})
export class ActivitiesReportComponent implements AfterViewInit {
  dateControl = new FormControl('');
  columnsDef: ColumnDef[] = ActivitiesReportColumns;
  observableData = new Observable<ActivitiesReportData[]>();
  isLoading = this.analysisService.isLoadingAdheranceReport
  constructor(private analysisService: AnalysisService) { }
  ngAfterViewInit(): void {
    this.observableData = this.dateControl.valueChanges.pipe(
      filter(val => val),
      switchMap(val => {
        return this.analysisService.getActivitiesReport(new Date(val));
      })
    )
    // .subscribe(x => {
    //   console.log(x[1]['Intervals']['00:00:00'])
    //   console.log(x);
    // })
  }

}

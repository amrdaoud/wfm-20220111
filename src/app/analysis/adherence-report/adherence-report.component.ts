
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdherenceFilter, AdherenceReportData } from 'src/app/app-models/analysis';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
import { AnalysisService } from 'src/app/app-services/analysis/analysis.service';

@Component({
  selector: 'app-adherence-report',
  templateUrl: './adherence-report.component.html',
  styleUrls: ['./adherence-report.component.css']
})
export class AdherenceReportComponent implements OnInit {
  observableData = new Observable<AdherenceReportData[]>();
  isLoading = this.analysisService.isLoadingAdheranceReport
  columnsDef: ColumnDef[] = [];
  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
  }

  getData(filter: AdherenceFilter) {
    console.log(filter);
    this.columnsDef = this.analysisService.getAdherenceReportColumns(filter);
    this.observableData = this.analysisService.getAdheranceReport(filter);
  }

}

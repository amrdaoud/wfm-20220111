import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ForecastDetail, ForecastDetailView } from 'src/app/app-models/forecasts';
import { ForecastService } from 'src/app/app-services/forecasts/forecast.service';

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.css']
})
export class ForecastDetailsComponent implements OnInit {
@Input() data = new Observable<ForecastDetail[]>();
isLoading = this.forecastService.statusAdd();
isLoadingInterval = this.forecastService.statusInterval();
@Input() isDisabled = false;
transformedData: ForecastDetailView[] = [];
dataSource = new MatTableDataSource<ForecastDetail>();
  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.data.subscribe(details => {
      this.transformedData = this.forecastService.transformDetails(details)

    })
  }
  get hours() : string[] {
    const hoursArray: string[] = [];
    for(var h = 0; h < 24; h++) {
      hoursArray.push(this.lpad(h))
    }
    return hoursArray;
  }
  lpad(s: number): string {
    return s.toString().length < 2 ? '0' + s: s.toString();
  }
  getColor(e: number): string {
    return `rgba(255,0,0,${e/50})`
  }
  editInterval(id: number, repCount: number, weekDay: string) {
    this.forecastService.editInterval(id, repCount).subscribe(result => {
      if(result) {
        this.transformedData.find(d => d.DayoffWeek === weekDay)!.ForecastIntervals.find(x => x.Id === id)!.EmployeeCount = result.EmployeeCount
      }
    })
  }

}

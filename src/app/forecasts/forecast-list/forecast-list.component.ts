import { filter, switchMap } from 'rxjs';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { Forecast, forecastColumns } from './../../app-models/forecasts';
import { ForecastService } from './../../app-services/forecasts/forecast.service';
import { Component, OnInit } from '@angular/core';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css']
})
export class ForecastListComponent implements OnInit {
  observableData = this.forecastService.forecasts();
  isLoading = this.forecastService.status();
  columnsDef: ColumnDef[] = forecastColumns;
  isDeleting = this.forecastService.statusAdd();
  constructor(private forecastService: ForecastService,
              private router: Router,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
  }
  goToForecast(model: Forecast) {
    this.router.navigateByUrl(`forecasts/${model.Id}`);
  }
  save(forecast: Forecast) {
    this.confirm.open('Are you sure you want to save?').pipe(
      filter(x => x),
      switchMap(() => {
        return this.forecastService.save(forecast.Id)
      })
    ).subscribe(x => {
      if(x) {
        forecast.IsSaved = true;
      }
    })
  }
  delete(forecast: Forecast) {
    this.confirm.open('Are you sure you want to delete?').pipe(
      filter(x => x),
      switchMap(() => {
        return this.forecastService.remove(forecast.Id)
      })
    ).subscribe()
  }

}

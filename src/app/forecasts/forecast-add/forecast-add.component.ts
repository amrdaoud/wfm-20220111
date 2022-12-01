import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, of, BehaviorSubject, map, tap, filter } from 'rxjs';
import { getDaysBetween } from 'src/app/app-helpers/date-helper';
import { Forecast, ForecastDetail } from 'src/app/app-models/forecasts';
import { ForecastService } from 'src/app/app-services/forecasts/forecast.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-forecast-add',
  templateUrl: './forecast-add.component.html',
  styleUrls: ['./forecast-add.component.css']
})
export class ForecastAddComponent implements OnInit {
isLoading = this.forecastService.statusOne();
isLoadingAdd = this.forecastService.statusAdd();
forecast!: Forecast
frm!: FormGroup;
dToExeclude: Date[] = [];
forecastDetails = new BehaviorSubject<ForecastDetail[]>([]);
isCheckingName = this.forecastService.isCheckingName;
  constructor(private forecastService:ForecastService,
              private route: ActivatedRoute,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id'));
        if(id) {
          return this.forecastService.getById(+id);
        }
        return of(null);
      })
    ).subscribe(result => this.assignForecast(result!))
  }

  assignForecast(result: Forecast) {
    this.forecast = result!;
    this.frm = this.forecastService.createForm(this.forecast);
    this.forecastDetails.next(this.forecast?.ForecastDetails);
    if(this.forecast) {
      this.dToExeclude = getDaysBetween(this.frm?.get('StartDate')?.value, this.frm?.get('EndDate')?.value);
      const frmExDates = (this.frm.get('ExceptDates')?.value as Date[]).map(x => x.getDate());
      const assigneeDates = this.dToExeclude.filter(x => frmExDates.includes(x.getDate()))
      this.frm.get('ExceptDates')?.setValue(assigneeDates);
    }
    this.frm?.get('EndDate')?.valueChanges.pipe(
      map((val) => {
        return getDaysBetween(this.frm?.get('StartDate')?.value, val);
      }),
      tap(dates => {
        if(dates && dates.length > 0) {
          this.dToExeclude = dates
          const frmExDates = (this.frm.get('ExceptDates')?.value as Date[]).map(x => x.getDate());
          const assigneeDates = this.dToExeclude.filter(x => frmExDates.includes(x.getDate()))
          this.frm.get('ExceptDates')?.setValue(assigneeDates);
        }
      })
    ).subscribe();

  }
  onSubmit() {
    if(this.frm?.invalid) {
      return;
    }
    if(this.forecast) {
      this.forecastService.edit(this.frm.value).subscribe(result => {
        if(result)
        this.assignForecast(result);
      });
    } else {
      this.forecastService.generate(this.frm.value).subscribe(result => {
        if(result)
        this.assignForecast(result);
      });
    }

  }
  save() {
    this.confirm.open('Saved schedule is unable to be updated. Do you want to proceed?').pipe(
      filter(x => x),
      switchMap(() => {
        return this.forecastService.save(this.forecast.Id)
      })
    ).subscribe(x => {
      if(x) {
        this.forecast.IsSaved = true;
        this.frm?.disable();
      }
    })
  }

}

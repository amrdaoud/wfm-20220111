import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { ActiveSchedule,  RecommendAll,  ScheduleSummary,  } from 'src/app/app-models/schedules';
import { ForecastService } from 'src/app/app-services/forecasts/forecast.service';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
schedule!: ActiveSchedule;
frm!: FormGroup;
scheduleSummary!: ScheduleSummary[];
isLoading = this.scheduleService.status();
isLoadingSummary = this.scheduleService.statusSummary();
isLoadingInterval = this.scheduleService.statusInterval();
showSummary = environment.tenant === 'Call Center';
forecasts = this.forecastService.forecasts().pipe(
  map(x => x.filter(y => y.IsSaved))
);
  constructor(private scheduleService: ScheduleService,
              private forecastService: ForecastService,
              private snaclBar: MatSnackBar,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.scheduleService.getUnpublished().subscribe(s => {
      this.schedule = s!;
      this.frm = new FormGroup({
        scheduleId: new FormControl(this.schedule?.Schedule.Id),
        forecastId: new FormControl('', Validators.required)
      });
      this.frm.valueChanges.pipe(
        switchMap(val => this.scheduleService.getSummary(val))
      ).subscribe(
        result => this.scheduleSummary = result
      )
      if(this.schedule?.Schedule?.ForecastId) {
        this.frm.get('forecastId')?.setValue(this.schedule?.Schedule?.ForecastId)
      }

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
  getColor(summary: ScheduleSummary): string {
    return (summary.AverageAvailable * (1 + summary.Tolerance)) < summary.AverageNeeded ? 'rgba(255,0,0,.2)' :
     (summary.AverageAvailable * (1 + summary.Tolerance)) - summary.AverageNeeded  < 0.34 * summary.AverageNeeded ? 'rgba(255,255,0,0.5)' : '';
  }

  editInterval(id: number, tolerance: number) {
    this.confirm.open('Are you sure you want to update all intervals tolerance?' ).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.scheduleService.editInterval(id, tolerance);
      })
    ).subscribe(result => {
      if(result) {
        this.scheduleSummary.find(d => d.IntervalId == result.IntervalId)!.Tolerance = result.Tolerance
      }
    })
  }
  editAllIntervals(tolerance: number) {
    this.scheduleService.editAllIntervals(tolerance).subscribe(result => {
      if(result) {
        this.scheduleSummary.forEach(interval => {
          interval.Tolerance = tolerance;
        })
      }
    })
  }
  generate() {
    this.confirm.open(`Are you sure you want to generate schedule ${this.schedule.Schedule.Name}`).pipe(
      filter(x => x),
      tap(() => {
        this.scheduleService.generateSchedule(this.frm.value).subscribe(x => {
          if(x) {
            this.snaclBar.open('Schedule Generated Successfully', 'Dismiss');
          }
        })
      })
    ).subscribe();

  }
  getRecommended(summary: ScheduleSummary):number {
    return Math.round((summary.AverageNeeded/0.66 - summary.AverageAvailable) / summary.AverageAvailable * 10) / 10;
  }
  setRecommendedAll() {
    const recommendAdd: RecommendAll[] = [];
        this.scheduleSummary.forEach(summary => {
          if(this.getRecommended(summary) > 0) {
            recommendAdd.push(
              {IntervalId: summary.IntervalId,
               Tolerance: Math.round((summary.AverageNeeded/0.66 - summary.AverageAvailable) / summary.AverageAvailable * 10) / 10
              });
          }
        });
    this.confirm.open('Are you sure you want to apply recommendations to all intervals').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.scheduleService.applyRecommendAll(recommendAdd);
      })
    ).subscribe(x => {
      if(x) {
        this.scheduleSummary.forEach(interval => {
          var tolerance = recommendAdd.find(i => i.IntervalId === interval.IntervalId)?.Tolerance;
          if(tolerance) {
            interval.Tolerance = Math.round((interval.AverageNeeded/0.66 - interval.AverageAvailable) / interval.AverageAvailable * 10) / 10;
          }

        });
      }
    });

  }

}

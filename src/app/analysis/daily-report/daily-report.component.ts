import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';
import { Schedule } from 'src/app/app-models/schedules';
import { AnalysisService } from 'src/app/app-services/analysis/analysis.service';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnChanges, OnInit {
@Input() schedule!: Schedule;
dataObservable!: Observable<any[]>;
dateControl = new FormControl('', Validators.required);
leftDisabled = new BehaviorSubject<boolean>(true);
rightDisabled = new BehaviorSubject<boolean>(true);
isLoading = this.analyisService.isLoadingGetNeededVsAvailable;
myFilter = (d: Date | null): boolean => {
  if(!this.schedule) {
    return false;
  }
  return new Date(d?.toDateString()!) >= new Date(this.schedule.StartDate) && new Date(d?.toDateString()!) <= new Date(this.schedule.EndDate);
};
  constructor(private analyisService: AnalysisService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["schedule"]) {
      this.myFilter = (d: Date | null): boolean => {
        if(!this.schedule) {
          return false;
        }
        return new Date(d?.toDateString()!) >= new Date(this.schedule.StartDate) && new Date(d?.toDateString()!) <= new Date(this.schedule.EndDate);
      };
      if(this.schedule){
        this.dateControl.setValue(this.schedule.StartDate)
      }
    }
  }
  ngOnInit(): void {
    this.dataObservable = this.dateControl.valueChanges.pipe(
      filter(val => val),
      tap(val => {
        if(new Date(val).getTime() === new Date(this.schedule?.StartDate).getTime()) {
          this.leftDisabled.next(true);
        } else {
          this.leftDisabled.next(false);
        }
        if(new Date(val).getTime() === new Date(this.schedule?.EndDate).getTime()) {
          this.rightDisabled.next(true);
        } else {
          this.rightDisabled.next(false);
        }
      }),
      switchMap(val => {
        return this.analyisService.getNeededVsAvailable(this.schedule.Id, new Date(val));
      })
    );
  }
  nextDay(day: number) {
    const nextDay = new Date(new Date(this.dateControl.value).getTime() + (day) * (1000 * 60 * 60 * 24));
    this.dateControl.setValue(nextDay);
  }


}

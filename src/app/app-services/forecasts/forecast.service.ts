import { Forecast, ForecastBinding, ForecastDetail, ForecastDetailView } from './../../app-models/forecasts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { splitDates } from 'src/app/app-helpers/date-helper';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private httpLoading = new BehaviorSubject<boolean>(false);
  private httpOneLoading = new BehaviorSubject<boolean>(false);
  private httpAddLoading = new BehaviorSubject<boolean>(false);
  private httpIntervalLoading = new BehaviorSubject<number[]>([]);
  private forecastsSubject = new BehaviorSubject<Forecast[]>([]);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }

  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<Forecast[]>(environment.apiUrl + 'Forecast/GetAll').pipe(
      tap(x => this.forecastsSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  getById(id: number): Observable<Forecast> {
    this.httpOneLoading.next(true);
    return this.http.get<Forecast>(environment.apiUrl + `Forecast/GetById?Id=${id}`).pipe(
      finalize(() => this.httpOneLoading.next(false))
    )
  }
  generate(model: ForecastBinding): Observable<Forecast> {
    this.httpAddLoading.next(true);
    return this.http.post<Forecast>(environment.apiUrl + 'Forecast/generate',model).pipe(
      tap(x => this.forecastsSubject.next([...this.forecastsSubject.value, x])),
      finalize(() =>  this.httpAddLoading.next(false))
    )
  }
  edit(model: ForecastBinding): Observable<Forecast> {
    this.httpAddLoading.next(true);
    return this.http.put<Forecast>(environment.apiUrl + `Forecast/${model.Id}`,model).pipe(
      tap(x => {
        let element = this.forecastsSubject.value.find(l => l.Id === model.Id);
        if(element) {
          const index = this.forecastsSubject.value.indexOf(element);
          this.forecastsSubject.value[index] = x;
          this.forecastsSubject.next(this.forecastsSubject.value);
        }
      }),
      finalize(() =>  this.httpAddLoading.next(false))
    );
  }
  save(id: number): Observable<Forecast> {
    this.httpAddLoading.next(true);
    return this.http.get<Forecast>(environment.apiUrl + `Forecast/save/${id}`).pipe(
      tap(x => {
        let element = this.forecastsSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.forecastsSubject.value.indexOf(element);
          this.forecastsSubject.value[index].IsSaved = true;
          this.forecastsSubject.next(this.forecastsSubject.value);
        }
      }),
      finalize(() =>  this.httpAddLoading.next(false))
    );
  }
  remove(id: number): Observable<boolean> {
    this.httpAddLoading.next(true);
    return this.http.delete<boolean>(environment.apiUrl + `Forecast/remove/${id}`).pipe(
      tap(x => {
        let element = this.forecastsSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.forecastsSubject.value.indexOf(element);
          this.forecastsSubject.value.splice(index,1);
          this.forecastsSubject.next(this.forecastsSubject.value);
        }
      }),
      finalize(() => this.httpAddLoading.next(false))
    )
  }
  editInterval(id: number, repCount: number): Observable<ForecastDetail> {
    this.httpIntervalLoading.next([...this.httpIntervalLoading.value, id]);
    return this.http.put<ForecastDetail>(environment.apiUrl + `Forecast/UpdateInterval/${id}`, {Id: id, NewEmployeeCount: repCount}).pipe(
      finalize(() =>  {
        const i = this.httpIntervalLoading.value.indexOf(id);
        this.httpIntervalLoading.value.splice(i,1);
        this.httpIntervalLoading.next(this.httpIntervalLoading.value);
      })
    );
  }

  forecasts(): Observable<Forecast[]> {
    return this.forecastsSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable()
  }
  statusOne(): Observable<boolean> {
    return this.httpOneLoading.asObservable()
  }
  statusAdd(): Observable<boolean> {
    return this.httpAddLoading.asObservable()
  }
  statusInterval(): Observable<number[]> {
    return this.httpIntervalLoading.asObservable()
  }
  createForm(model?: Forecast): FormGroup {
    const frm = new FormGroup ({
      Id: new FormControl(model ? model.Id : 0),
      StartDate: new FormControl(model? new Date(model.StartDate) : '', Validators.required),
      EndDate: new FormControl(model? new Date(model.EndDate) : '', Validators.required),
      Name: new FormControl(model?.Name, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)
      }),
      ExceptDates: new FormControl(model ? splitDates(model.ExceptDates) : []),
      ServiceLevel: new FormControl((model? model.ServiceLevel : 0.8), [Validators.required, Validators.min(0.01), Validators.max(1)]),
      ServiceTime: new FormControl(model ? model.ServiceTime : 180, [Validators.required, Validators.min(1)]),
      DurationTolerance: new FormControl((model? model.DurationTolerance : 0), Validators.required),
      OfferedTolerance: new FormControl((model? model.OfferedTolerance : 0), Validators.required)
    });
    if(model?.IsSaved) {
      frm.disable();
    }
    return frm;
  }

  transformDetails(forecastDetails: ForecastDetail[]): ForecastDetailView[] {
    var result: ForecastDetailView[] = [];
    forecastDetails.forEach(element => {
      const day = result.find(x => x.DayoffWeek === element.DayoffWeek);
      if(day) {
        day.ForecastIntervals.push({
                                    Id: element.Id,
                                    IntervalId: element.IntervalId,
                                    TimeHour: element.Interval.TimeMap.split(':')[0],
                                    TimeQuarter: element.Interval.TimeMap.split(':')[1],
                                    EmployeeCount: element.EmployeeCount
                                  })
      }
      else {
        result.push({DayoffWeek: element.DayoffWeek, ForecastIntervals: [{
          Id: element.Id,
          IntervalId: element.IntervalId,
          TimeHour: element.Interval.TimeMap.split(':')[0],
          TimeQuarter: element.Interval.TimeMap.split(':')[1],
          EmployeeCount: element.EmployeeCount}]})
      }
    });
    return result;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + `Forecast/CheckUniqeValue?name=${control.value}&ignoreName=wwwwwwwwww`).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }
  get isCheckingName():Observable<boolean> {
    return this.checkingName.asObservable();
  }
}

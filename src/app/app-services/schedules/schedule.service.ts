import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { ActiveSchedule, defaultRule, OneScheduleWithRules, RecommendAll, Schedule, ScheduleSummary, ScheduleWithRules, ScheduleWithRulesBinding, ShiftRule } from 'src/app/app-models/schedules';
import { environment } from 'src/environments/environment';

export const scheduleValidateDates: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDate = control.get('StartDate');
  const endDate = control.get('EndDate');

  return startDate && endDate  &&  (new Date(startDate.value) > new Date(endDate.value)) ? { startEnd: true } : null;
};
export const scheduleLongRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDate = control.get('StartDate');
  const endDate = control.get('EndDate');

  return startDate && endDate  &&  (new Date(endDate.value).getTime() - new Date(startDate.value).getTime()) / (1000 * 3600 * 24)
  > 56
   ? { longRange: true } : null;
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedulesSubject = new BehaviorSubject<Schedule[]>([]);
  private shiftRulesSubject = new BehaviorSubject<ShiftRule>(defaultRule);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private httpLoadingSummary = new BehaviorSubject<boolean>(false);
  private httpLoadingInterval = new BehaviorSubject<number[]>([]);
  private httpLoadingGenerate = new BehaviorSubject<boolean>(false);
  private httpLoadingPublish = new BehaviorSubject<boolean>(false);
  private httpLoadingSchedule = new BehaviorSubject<number[]>([]);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }

  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<ScheduleWithRules>(environment.apiUrl + 'ScheduleWithRule').pipe(
      tap(x => this.schedulesSubject.next(x.ScheduleData)),
      tap(x => this.shiftRulesSubject.next(x.ShiftRuleData)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  getById(id: number): Observable<OneScheduleWithRules> {
    this.httpLoading.next(true);
    return this.http.get<OneScheduleWithRules>(environment.apiUrl + `ScheduleWithRule/GetById?id=${id}`).pipe(
      finalize(() => this.httpLoading.next(false))
    )
  }
  add(model: ScheduleWithRulesBinding): void {
    this.httpLoading.next(true);
    this.http.post<ScheduleWithRulesBinding>(environment.apiUrl + 'ScheduleWithRule', model).pipe(
      tap(x => this.schedulesSubject.next([...this.schedulesSubject.value,x.ScheduleData])),
      tap(x => this.shiftRulesSubject.next(x.ShiftRuleData)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  delete(id:number): void {
    this.httpLoadingSchedule.next([...this.httpLoadingSchedule.value, id]);
    this.http.delete<boolean>(environment.apiUrl + `ScheduleWithRule/${id}`).pipe(
      tap(x => {
        if(x) {
          const element = this.schedulesSubject.value.find(s => s.Id === id);
          if(element) {
            const index = this.schedulesSubject.value.indexOf(element);
            this.schedulesSubject.value.splice(index,1)
            this.schedulesSubject.next(this.schedulesSubject.value);
          }
        }
      }),
      finalize(() => {
        const i = this.httpLoadingSchedule.value.indexOf(id);
        this.httpLoadingSchedule.value.splice(i,1);
        this.httpLoadingSchedule.next(this.httpLoadingSchedule.value);
      })
    ).subscribe();
  }
  editPublished(id:number, model: ScheduleWithRulesBinding): void {
    this.httpLoadingSchedule.next([...this.httpLoadingSchedule.value, id]);
    this.http.put<ScheduleWithRulesBinding>(environment.apiUrl + `ScheduleWithRule/published/${id}`, model).pipe(
      tap(x => {
        const element = this.schedulesSubject.value.find(s => s.Id === x.ScheduleData.Id);
        if(element) {
          const index = this.schedulesSubject.value.indexOf(element);
          this.schedulesSubject.value[index].EndDate = x.ScheduleData.EndDate;
          this.schedulesSubject.next(this.schedulesSubject.value);
        }
      }),
      tap(x => this.shiftRulesSubject.next(x.ShiftRuleData)),
      finalize(() => {
        const i = this.httpLoadingSchedule.value.indexOf(id);
        this.httpLoadingSchedule.value.splice(i,1);
        this.httpLoadingSchedule.next(this.httpLoadingSchedule.value);
      })
    ).subscribe();
  }
  edit(id:number, model: ScheduleWithRulesBinding): void {
    this.httpLoadingSchedule.next([...this.httpLoadingSchedule.value, id]);
    this.http.put<ScheduleWithRulesBinding>(environment.apiUrl + `ScheduleWithRule/${id}`, model).pipe(
      tap(x => {
        const element = this.schedulesSubject.value.find(s => s.Id === x.ScheduleData.Id);
        if(element) {
          const index = this.schedulesSubject.value.indexOf(element);
          this.schedulesSubject.value[index] = x.ScheduleData;
          this.schedulesSubject.next(this.schedulesSubject.value);
        }
      }),
      tap(x => this.shiftRulesSubject.next(x.ShiftRuleData)),
      finalize(() => {
        const i = this.httpLoadingSchedule.value.indexOf(id);
        this.httpLoadingSchedule.value.splice(i,1);
        this.httpLoadingSchedule.next(this.httpLoadingSchedule.value);
      })
    ).subscribe();
  }
  getSummary(model: {scheduleId: number, forecastId?: number}): Observable<ScheduleSummary[]> {
    this.httpLoadingSummary.next(true);
    return this.http.get<ScheduleSummary[]>(environment.apiUrl + `dailyattendances/summary?scheduleId=${model.scheduleId}`
    + (model.forecastId ? `&forecastId=${model.forecastId}` : ''))
    .pipe(
      finalize(() => this.httpLoadingSummary.next(false))
    );
  }
  generateSchedule(model: {scheduleId: number, forecastId: number}): Observable<number> {
    this.httpLoadingGenerate.next(true);
    return this.http.get<number>(environment.apiUrl +  `activeschedule/generate?scheduleId=${model.scheduleId}&forecastId=${model.forecastId}`).pipe(
      tap(() => {
        const element = this.schedulesSubject.value.find(s => s.Id === model.scheduleId);
        if(element) {
          const index = this.schedulesSubject.value.indexOf(element);
          this.schedulesSubject.value[index].ForecastId = model.forecastId;
          this.schedulesSubject.next(this.schedulesSubject.value);
        }
      }),
      map(() => model.scheduleId),
      finalize(() => this.httpLoadingGenerate.next(false))
    );
  }
  publishSchedule(id: number): Observable<Schedule> {
    this.httpLoadingSchedule.next([...this.httpLoadingSchedule.value, id]);
    return this.http.get<Schedule>(environment.apiUrl +  `activeschedule/publish/${id}`).pipe(
      tap(x => {
        const element = this.schedulesSubject.value.find(s => s.Id === x.Id);
        if(element) {
          const index = this.schedulesSubject.value.indexOf(element);
          this.schedulesSubject.value[index] = x;
          this.schedulesSubject.next(this.schedulesSubject.value);
        }
      }),
      finalize(() => {
        const i = this.httpLoadingSchedule.value.indexOf(id);
        this.httpLoadingSchedule.value.splice(i,1);
        this.httpLoadingSchedule.next(this.httpLoadingSchedule.value);
      })
    );
  }
  editInterval(intervalId: number, tolerance: number): Observable<{IntervalId: number, Tolerance: number}> {
    this.httpLoadingInterval.next([...this.httpLoadingInterval.value, intervalId]);
    return this.http.post<{IntervalId: number, Tolerance: number}>(environment.apiUrl + `Forecast/EditTolerance`, {IntervalId: intervalId, Tolerance: tolerance}).pipe(
      finalize(() =>  {
        const i = this.httpLoadingInterval.value.indexOf(intervalId);
        this.httpLoadingInterval.value.splice(i,1);
        this.httpLoadingInterval.next(this.httpLoadingInterval.value);
      })
    );
  }

  editAllIntervals(tolerance: number): Observable<boolean> {
    this.httpLoadingInterval.next(this.generateAllIntervalsIds());
    return this.http.get<boolean>(environment.apiUrl + `Forecast/EditAllTolerance?tolerance=${tolerance}`).pipe(
      finalize(() =>  {
        this.httpLoadingInterval.next([]);
      })
    );
  }
  applyRecommendAll(recommendAll: RecommendAll[]): Observable<boolean> {
    this.httpLoadingInterval.next(recommendAll.map(x => x.IntervalId));
    return this.http.post<boolean>(environment.apiUrl + `Forecast/RecommendAll`, recommendAll).pipe(
      finalize(() =>  {
        this.httpLoadingInterval.next([]);
      })
    );
  }
  getUnpublished(): Observable<ActiveSchedule> {
    this.httpLoading.next(true);
    return this.http.get<ActiveSchedule>(environment.apiUrl + 'ScheduleWithRule/unpublished').pipe(
      finalize(() => this.httpLoading.next(false))
    );
  }
  private generateAllIntervalsIds(): number[] {
    let intervalIds: number[] = [];
    for(var i = 1; i < 97; i++) {
      intervalIds.push(i);
    }
    return intervalIds;
  }
  schedules(): Observable<Schedule[]> {
    return this.schedulesSubject.asObservable();
  }
  shiftRules(): Observable<ShiftRule> {
    return this.shiftRulesSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  statusSummary(): Observable<boolean> {
    return this.httpLoadingSummary.asObservable();
  }
  statusInterval(): Observable<number[]> {
    return this.httpLoadingInterval.asObservable()
  }
  statusSchedule(): Observable<number[]> {
    return this.httpLoadingSchedule.asObservable()
  }
  statusGenerating(): Observable<boolean> {
    return this.httpLoadingGenerate.asObservable()
  }
  statusPublishing(): Observable<boolean> {
    return this.httpLoadingPublish.asObservable();
  }
  createForm(model?: ScheduleWithRulesBinding): FormGroup {
    const frm = new FormGroup({
      ScheduleData: new FormGroup({
        Id: new FormControl(model &&  model.ScheduleData ? model.ScheduleData.Id : 0),
        Name: new FormControl(model?.ScheduleData?.Name, {
          updateOn: 'blur',
          validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
          asyncValidators: this.validateName(model?.ScheduleData?.Name)
        }),
        StartDate: new FormControl(model ? new Date(model.ScheduleData?.StartDate) : '', Validators.required),
        EndDate: new FormControl(model ? new Date(model.ScheduleData?.EndDate) : '', Validators.required)
      }, [scheduleValidateDates, scheduleLongRange]),
      ShiftRuleData: new FormGroup({
        Id: new FormControl(model ? model.ShiftRuleData?.Id : 0),
        StartAfter: new FormControl(model?.ShiftRuleData?.StartAfter, Validators.required),
        EndBefore: new FormControl(model?.ShiftRuleData?.EndBefore, Validators.required),
        BreakBetween: new FormControl(model?.ShiftRuleData?.BreakBetween, Validators.required)
      })
    });
    if(model && model.ScheduleData && new Date(model.ScheduleData.EndDate) < new Date(new Date().toDateString())) {
      frm.disable();
    }
    else if(model?.ScheduleData?.IsPublish) {
      frm.get('ScheduleData')?.get('Name')?.disable();
      frm.get('ScheduleData')?.get('StartDate')?.disable();
      frm.get('ShiftRuleData')?.disable();
    }
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + `ScheduleWithRule/checkUniqe?value=${control.value}&ignoreName=wwwwwwwwww`).pipe(
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

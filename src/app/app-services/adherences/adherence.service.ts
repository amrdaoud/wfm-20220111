import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, filter, finalize, first, map, Observable, of, tap } from 'rxjs';
import { AdherenceByDay, AdherenceByDayLoader, AdherenceBySchedule, AdherenceByScheduleLoader, AdherenceByStaff, AdherenceByStaffDay, AdherenceByStaffDayLoader, AdherenceByStaffLoader } from 'src/app/app-models/adherences';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdherenceService {
private AdherenceByStaffs$ = new BehaviorSubject<AdherenceByStaff[]>([]);
private AdherenceByStaffsLoader$ = new BehaviorSubject<AdherenceByStaffLoader[]>([]);

private AdherenceByStaffsDays$ = new BehaviorSubject<AdherenceByStaffDay[]>([]);
private AdherenceByStaffsDaysLoader$ = new BehaviorSubject<AdherenceByStaffDayLoader[]>([]);

private AdherenceByDays$ = new BehaviorSubject<AdherenceByDay[]>([]);
private AdherenceByDaysLoader$ = new BehaviorSubject<AdherenceByDayLoader[]>([]);

private AdherenceByDaysAll$ = new BehaviorSubject<AdherenceByDay[]>([]);
private AdherenceByDaysLoaderAll$ = new BehaviorSubject<AdherenceByDayLoader[]>([]);

private AdherenceBySchedules$ = new BehaviorSubject<AdherenceBySchedule[]>([]);
private AdherenceBySchedulesLoader$ = new BehaviorSubject<AdherenceByScheduleLoader[]>([]);

private AdherenceBySchedulesAll$ = new BehaviorSubject<AdherenceBySchedule[]>([]);
private AdherenceBySchedulesLoaderAll$ = new BehaviorSubject<AdherenceByScheduleLoader[]>([]);
  constructor(private http: HttpClient) { }

//By Staff
  private addByStaff(scheduleId: number, staffId: number, adherence: number) {
    var available = this.AdherenceByStaffs$.value.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId)
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceByStaffs$.value.push({StaffId: staffId, ScheduleId: scheduleId, Adherence: adherence})
    }
    this.AdherenceByStaffs$.next(this.AdherenceByStaffs$.value);
  }
  private removeByStaff(scheduleId: number, staffId: number) {
    var available = this.AdherenceByStaffs$.value.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId)
    if(available) {
      const i = this.AdherenceByStaffs$.value.indexOf(available);
      this.AdherenceByStaffs$.value.splice(i,1);
      this.AdherenceByStaffs$.next(this.AdherenceByStaffs$.value);
    }
  }
  private httpGetByStaff(scheduleId: number, staffId: number): Observable<number> {
    this.removeByStaff(scheduleId, staffId);
    this.AdherenceByStaffsLoader$.next([...this.AdherenceByStaffsLoader$.value, {ScheduleId: scheduleId, StaffId: staffId}])
    return this.http.get<number>(environment.apiUrl + `adherence/bystaff?scheduleId=${scheduleId}&staffId=${staffId}`).pipe(
      tap(x => {
        this.addByStaff(scheduleId, staffId, x);
      }),
      finalize(() => {
        const available = this.AdherenceByStaffsLoader$.value.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId);
        if(available) {
          const i = this.AdherenceByStaffsLoader$.value.indexOf(available);
          this.AdherenceByStaffsLoader$.value.splice(i,1);
          this.AdherenceByStaffsLoader$.next(this.AdherenceByStaffsLoader$.value);
        }

      })
    )
  }
  getByStaff(scheduleId: number, staffId: number): Observable<number | undefined> {
    const isWaiting = this.AdherenceByStaffsLoader$.value.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId);
    if(isWaiting) {
      return this.AdherenceByStaffs$.pipe(
        map(e => e.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId)?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceByStaffs$.value.find(x => x.ScheduleId === scheduleId && x.StaffId === staffId);
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetByStaff(scheduleId, staffId);
      }
    }
  }
  updateByStaff(scheduleId: number, staffId: number) {
    this.httpGetByStaff(scheduleId, staffId).subscribe();
  }
//By Staff-Days
  private addByStaffDay(staffId: number,day: Date, adherence: number) {
    var available = this.AdherenceByStaffsDays$.value.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId)
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceByStaffsDays$.value.push({StaffId: staffId, Day: day, Adherence: adherence})
    }
    this.AdherenceByStaffsDays$.next(this.AdherenceByStaffsDays$.value);
  }
  private removeByStaffDay(staffId: number,day: Date) {
    var available = this.AdherenceByStaffsDays$.value.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId)
    if(available) {
      const i = this.AdherenceByStaffsDays$.value.indexOf(available);
      this.AdherenceByStaffsDays$.value.splice(i,1);
      this.AdherenceByStaffsDays$.next(this.AdherenceByStaffsDays$.value);
    }
  }
  private httpGetByStaffDay(scheduleId: number, staffId: number,day: Date): Observable<number> {
    this.removeByStaffDay(staffId, day);
    this.AdherenceByStaffsDaysLoader$.next([...this.AdherenceByStaffsDaysLoader$.value, {Day: day, StaffId: staffId}])
    let params = new HttpParams()
      .set('scheduleId',scheduleId)
      .set('day', day.toDateString())
      .set('staffId', staffId)
    return this.http.get<number>(environment.apiUrl + `adherence/bystaffday`,{params}).pipe(
      tap(x => {
        this.addByStaffDay(staffId, day, x);
      }),
      finalize(() => {
        const available = this.AdherenceByStaffsDaysLoader$.value.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId);
        if(available) {
          const i = this.AdherenceByStaffsDaysLoader$.value.indexOf(available);
          this.AdherenceByStaffsDaysLoader$.value.splice(i,1);
          this.AdherenceByStaffsDaysLoader$.next(this.AdherenceByStaffsDaysLoader$.value);
        }

      })
    )
  }
  getByStaffDay(scheduleId: number, staffId: number, day: Date): Observable<number | undefined> {
    const isWaiting = this.AdherenceByStaffsDaysLoader$.value.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId);
    if(isWaiting) {
      return this.AdherenceByStaffsDays$.pipe(
        map(e => e.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId)?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceByStaffsDays$.value.find(x => x.Day.getTime() === day.getTime() && x.StaffId === staffId);
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetByStaffDay(scheduleId, staffId, day);
      }
    }
  }
  updateByStaffDay(scheduleId: number, staffId: number, day: Date) {
    this.httpGetByStaffDay(scheduleId, staffId,day).subscribe();
    this.updateByDay(scheduleId,day);
    this.updateByDayAll(scheduleId,day);
    this.updateByStaff(scheduleId,staffId);
    this.updateBySchedule(scheduleId);
    this.updateByScheduleAll(scheduleId);
  }

//By Day
  private addByDay(day: Date, adherence: number) {
    var available = this.AdherenceByDays$.value.find(x => x.Day.getTime() === day.getTime())
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceByDays$.value.push({Day: day, Adherence: adherence})
    }
    this.AdherenceByDays$.next(this.AdherenceByDays$.value);
  }
  private removeByDay(day:Date) {
    var available = this.AdherenceByDays$.value.find(x => x.Day.getTime() === day.getTime())
    if(available) {
      const i = this.AdherenceByDays$.value.indexOf(available);
      this.AdherenceByDays$.value.splice(i,1);
      this.AdherenceByDays$.next(this.AdherenceByDays$.value);
    }
  }
  private httpGetByDay(scheduleId: number, day: Date): Observable<number> {
    this.removeByDay(day);
    this.AdherenceByDaysLoader$.next([...this.AdherenceByDaysLoader$.value, {Day: day}])
    let params = new HttpParams()
      .set('scheduleId',scheduleId)
      .set('day', day.toDateString());
    return this.http.get<number>(environment.apiUrl + `adherence/byday`,{params}).pipe(
      tap(x => {
        this.addByDay(day, x);
      }),
      finalize(() => {
        const available = this.AdherenceByDaysLoader$.value.find(x => x.Day.getTime() === day.getTime());
        if(available) {
          const i = this.AdherenceByDaysLoader$.value.indexOf(available);
          this.AdherenceByDaysLoader$.value.splice(i,1);
          this.AdherenceByDaysLoader$.next(this.AdherenceByDaysLoader$.value);
        }

      })
    )
  }
  getByDay(scheduleId: number, day: Date): Observable<number | undefined> {
    const isWaiting = this.AdherenceByDaysLoader$.value.find(x => x.Day.getTime() === day.getTime());
    if(isWaiting) {
      return this.AdherenceByDays$.pipe(
        map(e => e.find(x => x.Day.getTime() === day.getTime())?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceByDays$.value.find(x => x.Day.getTime() === day.getTime());
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetByDay(scheduleId, day);
      }
    }
  }
  updateByDay(scheduleId: number, day: Date) {
    this.httpGetByDay(scheduleId, day).subscribe();
  }

  //By Day All
  private addByDayAll(day: Date, adherence: number) {
    var available = this.AdherenceByDaysAll$.value.find(x => x.Day.getTime() === day.getTime())
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceByDaysAll$.value.push({Day: day, Adherence: adherence})
    }
    this.AdherenceByDaysAll$.next(this.AdherenceByDaysAll$.value);
  }
  private removeByDayAll(day:Date) {
    var available = this.AdherenceByDaysAll$.value.find(x => x.Day.getTime() === day.getTime())
    if(available) {
      const i = this.AdherenceByDaysAll$.value.indexOf(available);
      this.AdherenceByDaysAll$.value.splice(i,1);
      this.AdherenceByDaysAll$.next(this.AdherenceByDaysAll$.value);
    }
  }
  private httpGetByDayAll(scheduleId: number, day: Date): Observable<number> {
    this.removeByDayAll(day);
    this.AdherenceByDaysLoaderAll$.next([...this.AdherenceByDaysLoaderAll$.value, {Day: day}])
    let params = new HttpParams()
      .set('scheduleId',scheduleId)
      .set('day', day.toDateString());
    return this.http.get<number>(environment.apiUrl + `adherence/byday/all`,{params}).pipe(
      tap(x => {
        this.addByDayAll(day, x);
      }),
      finalize(() => {
        const available = this.AdherenceByDaysLoaderAll$.value.find(x => x.Day.getTime() === day.getTime());
        if(available) {
          const i = this.AdherenceByDaysLoaderAll$.value.indexOf(available);
          this.AdherenceByDaysLoaderAll$.value.splice(i,1);
          this.AdherenceByDaysLoaderAll$.next(this.AdherenceByDaysLoaderAll$.value);
        }

      })
    )
  }
  getByDayAll(scheduleId: number, day: Date): Observable<number | undefined> {
    const isWaiting = this.AdherenceByDaysLoaderAll$.value.find(x => x.Day.getTime() === day.getTime());
    if(isWaiting) {
      return this.AdherenceByDaysAll$.pipe(
        map(e => e.find(x => x.Day.getTime() === day.getTime())?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceByDaysAll$.value.find(x => x.Day.getTime() === day.getTime());
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetByDayAll(scheduleId, day);
      }
    }
  }
  updateByDayAll(scheduleId: number, day: Date) {
    this.httpGetByDayAll(scheduleId, day).subscribe();
  }

//By Schedule
  private addBySchedule(scheduleId: number, adherence: number) {
    var available = this.AdherenceBySchedules$.value.find(x => x.ScheduleId === scheduleId)
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceBySchedules$.value.push({ScheduleId: scheduleId, Adherence: adherence})
    }
    this.AdherenceBySchedules$.next(this.AdherenceBySchedules$.value);
  }
  private removeBySchedule(scheduleId:number) {
    var available = this.AdherenceBySchedules$.value.find(x => x.ScheduleId === scheduleId)
    if(available) {
      const i = this.AdherenceBySchedules$.value.indexOf(available);
      this.AdherenceBySchedules$.value.splice(i,1);
      this.AdherenceBySchedules$.next(this.AdherenceBySchedules$.value);
    }
  }
  private httpGetBySchedule(scheduleId: number): Observable<number> {
    this.removeBySchedule(scheduleId);
    this.AdherenceBySchedulesLoader$.next([...this.AdherenceBySchedulesLoader$.value, {ScheduleId: scheduleId}])
    return this.http.get<number>(environment.apiUrl + `adherence/byschedule?scheduleId=${scheduleId}`).pipe(
      tap(x => {
        this.addBySchedule(scheduleId, x);
      }),
      finalize(() => {
        const available = this.AdherenceBySchedulesLoader$.value.find(x => x.ScheduleId === scheduleId);
        if(available) {
          const i = this.AdherenceBySchedulesLoader$.value.indexOf(available);
          this.AdherenceBySchedulesLoader$.value.splice(i,1);
          this.AdherenceBySchedulesLoader$.next(this.AdherenceBySchedulesLoader$.value);
        }

      })
    )
  }
  getBySchedule(scheduleId: number): Observable<number | undefined> {
    const isWaiting = this.AdherenceBySchedulesLoader$.value.find(x => x.ScheduleId === scheduleId);
    if(isWaiting) {
      return this.AdherenceBySchedules$.pipe(
        map(e => e.find(x => x.ScheduleId === scheduleId)?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceBySchedules$.value.find(x => x.ScheduleId === scheduleId);
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetBySchedule(scheduleId);
      }
    }
  }
  updateBySchedule(scheduleId: number) {
    this.httpGetBySchedule(scheduleId).subscribe();
  }

  //By Schedule All
  private addByScheduleAll(scheduleId: number, adherence: number) {
    var available = this.AdherenceBySchedulesAll$.value.find(x => x.ScheduleId === scheduleId)
    if(available) {
      available.Adherence = adherence;
    }
    else {
      this.AdherenceBySchedulesAll$.value.push({ScheduleId: scheduleId, Adherence: adherence})
    }
    this.AdherenceBySchedulesAll$.next(this.AdherenceBySchedulesAll$.value);
  }
  private removeByScheduleAll(scheduleId:number) {
    var available = this.AdherenceBySchedulesAll$.value.find(x => x.ScheduleId === scheduleId)
    if(available) {
      const i = this.AdherenceBySchedulesAll$.value.indexOf(available);
      this.AdherenceBySchedulesAll$.value.splice(i,1);
      this.AdherenceBySchedulesAll$.next(this.AdherenceBySchedulesAll$.value);
    }
  }
  private httpGetByScheduleAll(scheduleId: number): Observable<number> {
    this.removeByScheduleAll(scheduleId);
    this.AdherenceBySchedulesLoaderAll$.next([...this.AdherenceBySchedulesLoaderAll$.value, {ScheduleId: scheduleId}])
    return this.http.get<number>(environment.apiUrl + `adherence/byschedule/all?scheduleId=${scheduleId}`).pipe(
      tap(x => {
        this.addByScheduleAll(scheduleId, x);
      }),
      finalize(() => {
        const available = this.AdherenceBySchedulesLoaderAll$.value.find(x => x.ScheduleId === scheduleId);
        if(available) {
          const i = this.AdherenceBySchedulesLoaderAll$.value.indexOf(available);
          this.AdherenceBySchedulesLoaderAll$.value.splice(i,1);
          this.AdherenceBySchedulesLoaderAll$.next(this.AdherenceBySchedulesLoaderAll$.value);
        }

      })
    )
  }
  getByScheduleAll(scheduleId: number): Observable<number | undefined> {
    const isWaiting = this.AdherenceBySchedulesLoaderAll$.value.find(x => x.ScheduleId === scheduleId);
    if(isWaiting) {
      return this.AdherenceBySchedulesAll$.pipe(
        map(e => e.find(x => x.ScheduleId === scheduleId)?.Adherence),
        filter(e => e !== undefined),
        first()
      )
    }
    else {
      var available = this.AdherenceBySchedulesAll$.value.find(x => x.ScheduleId === scheduleId);
      if(available) {
      return of(available.Adherence);
      }
      else {
        return this.httpGetByScheduleAll(scheduleId);
      }
    }
  }
  updateByScheduleAll(scheduleId: number) {
    this.httpGetByScheduleAll(scheduleId).subscribe();
  }


  get loaderByStaff(): Observable<AdherenceByStaffLoader[]> {
    return this.AdherenceByStaffsLoader$.asObservable();
  }
  get loaderByStaffDay(): Observable<AdherenceByStaffDayLoader[]> {
    return this.AdherenceByStaffsDaysLoader$.asObservable();
  }
  get loaderBySchedule(): Observable<AdherenceByScheduleLoader[]> {
    return this.AdherenceBySchedulesLoader$.asObservable();
  }
  get loaderByScheduleAll(): Observable<AdherenceByScheduleLoader[]> {
    return this.AdherenceBySchedulesLoaderAll$.asObservable();
  }
  get loaderByDay(): Observable<AdherenceByDayLoader[]> {
    return this.AdherenceByDaysLoader$.asObservable();
  }
  get loaderByDayAll(): Observable<AdherenceByDayLoader[]> {
    return this.AdherenceByDaysLoaderAll$.asObservable();
  }

  getLoaderByStaff(scheduleId: number, staffId: number): Observable<boolean> {
    return this.AdherenceByStaffsLoader$.pipe(
      map(x => {
        return x.find(z => z.StaffId === staffId && z.ScheduleId === scheduleId) != undefined;
      })
    )
  }
  getLoaderByStaffDay(staffId: number, day: Date): Observable<boolean> {
    return this.AdherenceByStaffsDaysLoader$.pipe(
      map(x => {
        return x.find(z => z.StaffId === staffId && z.Day.getTime() === day.getTime()) != undefined;
      })
    )
  }

}

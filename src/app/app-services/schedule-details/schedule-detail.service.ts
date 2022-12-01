import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Interval } from 'src/app/app-models/forecasts';
import { DailyAttendance, DailyAttendanceBackup, DailyAttendanceByStaff, DailyAttendanceByStaffWithSize, DailyAttendanceInfo, DailyScheduleAttendanceByStaff, EditScheduleDetailsBinding, HourlyInterval, intervalList, ManipulateDetails, ScheduleByDay, ScheduleByDayWithSize, ScheduleByStaff, ScheduleDetail } from 'src/app/app-models/schedule-details';
import { environment } from 'src/environments/environment';
import { AdherenceService } from '../adherences/adherence.service';
import { ActivityService } from '../shifts-and-activities/activity.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailService {
private intervalsSubject = new BehaviorSubject<Interval[]>([]);
private bacupIntervalsSubject = new BehaviorSubject<Interval[]>([]);
private daysSubject = new BehaviorSubject<Date[]>([]);
private httpLoadingAttendance = new BehaviorSubject<boolean>(false);
private httpLoadingBackups = new BehaviorSubject<boolean>(false);
private httpLoadingDetails = new BehaviorSubject<number[]>([]);
private httpAddingDetails = new BehaviorSubject<string[]>([]);
private httpEditingAttendance = new BehaviorSubject<number[]>([]);

activities = this.activityService.activities();
  constructor(private http:HttpClient,
              private activityService:ActivityService,
              private adherenceService: AdherenceService) { }
  getScheduleByStaff(scheduleId: number, staffId: number): Observable<ScheduleByStaff> {
    this.httpLoadingAttendance.next(true);
    return this.http.get<ScheduleByStaff>(environment.apiUrl +  `ActiveSchedule/schedulebystaff?scheduleId=${scheduleId}&staffId=${staffId}`).
    pipe(
      tap(x => this.intervalsSubject.next(this.generateStringIntervals(x?.DailyAttendances, 4))),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  getScheduleByDate(scheduleId: number, day: Date, pageIndex: number, pageSize: number, searchQuery: string, type: string): Observable<ScheduleByDayWithSize> {
    this.httpLoadingAttendance.next(true);
    let params = new HttpParams()
    .set('scheduleId',scheduleId)
    .set('day', day.toDateString())
    .set('pageIndex', pageIndex)
    .set('pageSize', pageSize)
    .set('searchQuery', searchQuery)
    .set('type', type)
    return this.http.get<ScheduleByDayWithSize>(environment.apiUrl + `ActiveSchedule/schedulebyDayPage`,{params})
    .pipe(
      tap(x => {
        this.intervalsSubject.next(this.generateStringIntervals(x?.Result?.DailyAttendances, 4))
      }),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  getScheduleByDateAll(scheduleId: number, day: Date, pageIndex: number, pageSize: number, searchQuery: string, type: string): Observable<ScheduleByDayWithSize> {
    this.httpLoadingAttendance.next(true);
    let params = new HttpParams()
    .set('scheduleId',scheduleId)
    .set('day', day.toDateString())
    .set('pageIndex', pageIndex)
    .set('pageSize', pageSize)
    .set('searchQuery', searchQuery)
    .set('type', type)
    return this.http.get<ScheduleByDayWithSize>(environment.apiUrl + `ActiveSchedule/schedulebyDayPage/all`,{params})
    .pipe(
      tap(x => {
        this.intervalsSubject.next(this.generateStringIntervals(x?.Result?.DailyAttendances, 0))
      }),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  getScheduleByStaffDate(scheduleId: number, staffId: number,day: Date): Observable<ScheduleByStaff> {
    this.httpLoadingAttendance.next(true);
    let params = new HttpParams()
    .set('scheduleId',scheduleId)
    .set('day', day.toDateString())
    .set('staffId', staffId)
    return this.http.get<ScheduleByStaff>(environment.apiUrl + `ActiveSchedule/schedulebystaffday`,{params})
    .pipe(
      tap(x => {
        this.intervalsSubject.next(this.generateStringIntervals(x?.DailyAttendances, 4))
      }),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  getDailyAttendance(scheduleId: number, pageIndex: number, pageSize: number, searchQuery: string, type: string): Observable<DailyAttendanceByStaffWithSize> {
    this.httpLoadingAttendance.next(true);
    return this.http.get<DailyAttendanceByStaffWithSize>(environment.apiUrl +  `ActiveSchedule/schedulebyIdpage?scheduleId=${scheduleId}&pageIndex=${pageIndex}&pageSize=${pageSize}&searchQuery=${searchQuery}&type=${type}`)
    .pipe(
      tap(x => this.daysSubject.next(this.generateDays(x.Result.DailyStaffs))),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  getDailyAttendanceAll(scheduleId: number, pageIndex: number, pageSize: number, searchQuery: string, type: string): Observable<DailyAttendanceByStaffWithSize> {
    this.httpLoadingAttendance.next(true);
    return this.http.get<DailyAttendanceByStaffWithSize>(environment.apiUrl +
      `ActiveSchedule/schedulebyIdpage/all?scheduleId=${scheduleId}&pageIndex=${pageIndex}&pageSize=${pageSize}&searchQuery=${searchQuery}&type=${type}`)
    .pipe(
      tap(x => this.daysSubject.next(this.generateDays(x.Result.DailyStaffs))),
      finalize(() => {
        this.httpLoadingAttendance.next(false);
      })
    )
  }
  updateScheduleDetail(schedueDetailId: number, activityId: number, scheduleId: number, staffId: number, day: Date): Observable<ScheduleDetail> {
    this.httpLoadingDetails.next([...this.httpLoadingDetails.value, schedueDetailId]);
    return this.http.get<ScheduleDetail>(environment.apiUrl + `ActiveSchedule/EditScheduleDetails?scheduleDetailId=${schedueDetailId}&activityId=${activityId}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpLoadingDetails.value.indexOf(schedueDetailId);
        this.httpLoadingDetails.value.splice(i,1);
        this.httpLoadingDetails.next(this.httpLoadingDetails.value);
      })
    )
  }
  manipulateScheduleDetailsPerStaff(model: ManipulateDetails,staffId: number, scheduleId: number): Observable<DailyAttendance[]> {
    this.httpAddingDetails.next([...this.httpAddingDetails.value,
    ...model.ScheduleDetailsManipulate.map(x => `${x.DailyAttendanceId}-${x.IntervalId}`)
    ]);
    return this.http.post<DailyAttendance[]>(environment.apiUrl + `ActiveSchedule/manipulatescheduledetails/staff/${scheduleId}`,model).pipe(
      tap(result => {
        if(result) {
          result.forEach(element => {
            this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(element.Day))
          });
        }
      }),
      finalize(() => {
        model.ScheduleDetailsManipulate.forEach(element => {
          const i = this.httpAddingDetails.value.indexOf(`${element.DailyAttendanceId}-${element.IntervalId}`);
        this.httpAddingDetails.value.splice(i,1);
        this.httpAddingDetails.next(this.httpAddingDetails.value);
        })
      })
    )

  }
  manipulateScheduleDetailsPerDay(model: ManipulateDetails,day: Date, scheduleId: number): Observable<DailyScheduleAttendanceByStaff[]> {
    this.httpAddingDetails.next([...this.httpAddingDetails.value,
    ...model.ScheduleDetailsManipulate.map(x => `${x.DailyAttendanceId}-${x.IntervalId}`)
    ]);
    return this.http.post<DailyScheduleAttendanceByStaff[]>(environment.apiUrl + `ActiveSchedule/manipulatescheduledetails/day/${scheduleId}`,model).pipe(
      tap(result => {
        if(result) {
          result.forEach(element => {
            this.adherenceService.updateByStaffDay(scheduleId, element.Id, new Date(day))
          });
        }
      }),
      finalize(() => {
        model.ScheduleDetailsManipulate.forEach(element => {
          const i = this.httpAddingDetails.value.indexOf(`${element.DailyAttendanceId}-${element.IntervalId}`);
        this.httpAddingDetails.value.splice(i,1);
        this.httpAddingDetails.next(this.httpAddingDetails.value);
        })
      })
    )

  }
  deleteScheduleDetail(scheduleDetailId: number, scheduleId: number, staffId: number, day: Date) {
    this.httpLoadingDetails.next([...this.httpLoadingDetails.value, scheduleDetailId]);
    return this.http.delete<boolean>(environment.apiUrl + `ActiveSchedule/DeleteScheduleDetail/${scheduleDetailId}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpLoadingDetails.value.indexOf(scheduleDetailId);
        this.httpLoadingDetails.value.splice(i,1);
        this.httpLoadingDetails.next(this.httpLoadingDetails.value);
      })
    )
  }
  addScheduleDetail(dailyAttendanceId: number, intervalId: number, activityId: number, scheduleId: number, staffId: number, day: Date): Observable<ScheduleDetail> {
    this.httpAddingDetails.next([...this.httpAddingDetails.value, `${dailyAttendanceId}-${intervalId}` ]);
    return this.http.get<ScheduleDetail>(environment.apiUrl + `ActiveSchedule/AddScheduleDetails?dailyAttendanceId=${dailyAttendanceId}&intervalId=${intervalId}&activityId=${activityId}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpAddingDetails.value.indexOf(`${dailyAttendanceId}-${intervalId}`);
        this.httpAddingDetails.value.splice(i,1);
        this.httpAddingDetails.next(this.httpAddingDetails.value);
      })
    )
  }
  editDailyAttendance(dailyAttendanceId: number, attendanceTypeId: number, scheduleId: number, staffId: number, day: Date): Observable<DailyAttendanceInfo> {
    this.httpEditingAttendance.next([...this.httpLoadingDetails.value,dailyAttendanceId]);
    return this.http.get<DailyAttendanceInfo>(environment.apiUrl + `ActiveSchedule/EditDailyAttendance?dailyAttendanceId=${dailyAttendanceId}&attendanceTypeId=${attendanceTypeId}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpEditingAttendance.value.indexOf(dailyAttendanceId);
        this.httpEditingAttendance.value.splice(i,1);
        this.httpEditingAttendance.next(this.httpEditingAttendance.value);
      })
    )
  }
  editDailyAttendanceShift(dailyAttendanceId: number, transportationId: number, scheduleId: number, staffId: number, day: Date): Observable<DailyAttendanceInfo> {
    this.httpEditingAttendance.next([...this.httpLoadingDetails.value,dailyAttendanceId]);
    return this.http.get<DailyAttendanceInfo>(environment.apiUrl + `ActiveSchedule/EditDailyAttendanceShift?dailyAttendanceId=${dailyAttendanceId}&transportationId=${transportationId}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpEditingAttendance.value.indexOf(dailyAttendanceId);
        this.httpEditingAttendance.value.splice(i,1);
        this.httpEditingAttendance.next(this.httpEditingAttendance.value);
      })
    )
  }
  getDailyAttendanceBackups(id: number): Observable<DailyAttendanceBackup[]> {
    this.httpLoadingBackups.next(true);
    return this.http.get<DailyAttendanceBackup[]>(environment.apiUrl + `ActiveSchedule/backups/${id}`).pipe(
      tap(x => this.bacupIntervalsSubject.next(this.generateStringIntervalBackups(x, 4))),
      finalize(() => this.httpLoadingBackups.next(false))
    )
  }
  undoDailyAttendance(dailyAttendanceId: number, withDetails:boolean, scheduleId: number, staffId: number, day: Date): Observable<DailyAttendanceInfo | DailyAttendance> {
    this.httpEditingAttendance.next([...this.httpLoadingDetails.value,dailyAttendanceId]);
    return this.http.get<DailyAttendanceInfo>(environment.apiUrl + `ActiveSchedule/undodailyattendance?dailyAttendanceId=${dailyAttendanceId}&withDetails=${withDetails ? withDetails : false}`)
    .pipe(
      tap(x => {
        this.adherenceService.updateByStaffDay(scheduleId, staffId, new Date(day));
      }),
      finalize(() => {
        const i = this.httpEditingAttendance.value.indexOf(dailyAttendanceId);
        this.httpEditingAttendance.value.splice(i,1);
        this.httpEditingAttendance.next(this.httpEditingAttendance.value);
      })
    )
  }
  copyAttendance(sourceId: number, destinationIds: number[], isAll: boolean, scheduleId: number): Observable<DailyAttendanceInfo[]> {
    this.httpEditingAttendance.next([...this.httpLoadingDetails.value, ...destinationIds]);
    return this.http.post<DailyAttendanceInfo[]>(environment.apiUrl + 'ActiveSchedule/copydailyattendance', {SourceId: sourceId, DestinationIds: destinationIds})
    .pipe(
      tap(x => {
        if(isAll) {
          this.adherenceService.updateByScheduleAll(scheduleId);
        }
        else {
          this.adherenceService.updateBySchedule(scheduleId);
        }

      }),
      finalize(() => {
        destinationIds.forEach(element => {
          const i = this.httpEditingAttendance.value.indexOf(element);
          this.httpEditingAttendance.value.splice(i,1);
        });
        this.httpEditingAttendance.next(this.httpEditingAttendance.value);
      })
    )
  }
  generateStringIntervals(daily: DailyAttendance[] | DailyScheduleAttendanceByStaff[] | DailyAttendanceBackup[], addIntervals:number): Interval[] {
    var flat = daily.map(x => Object.keys(x.ScheduleDetails).map(x => +x)).flat().filter(this.onlyUnique);
    const maxIntervalId = Math.max(...flat);
    const minIntervalId = Math.min(...flat);
    const intervals = intervalList.filter(x => x.Id >= minIntervalId - addIntervals && x.Id <= maxIntervalId + addIntervals)
    return intervals.sort((a,b) => a.Id - b.Id);
}
generateStringIntervalBackups(daily:DailyAttendanceBackup[], addIntervals:number): Interval[] {
  var flat = daily.map(x => Object.keys(x.ScheduleDetails).map(x => +x)).flat().filter(this.onlyUnique);
  const maxIntervalId = Math.max(...flat);
  const minIntervalId = Math.min(...flat);
  const intervals = intervalList.filter(x => x.Id >= minIntervalId - addIntervals && x.Id <= maxIntervalId + addIntervals)
  return intervals.sort((a,b) => a.Id - b.Id);
}
onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}
  generateDays(daily: DailyAttendanceByStaff[]): Date[] {
    const days: Date[] = [];
    daily.forEach(element => {
      element.DailyAttendances.forEach(d => {
        if(!days.includes(d.Day)) {
          days.push(d.Day);
        }
      })
    })
    return days;
  }

  get involvedIntervals(): Observable<Interval[]> {
    return this.intervalsSubject.asObservable();
  }
  get involvedBackupIntervals(): Observable<Interval[]> {
    return this.bacupIntervalsSubject.asObservable();
  }
  get involvedDays(): Observable<Date[]> {
    return this.daysSubject.asObservable();
  }
  get statusBackups(): Observable<boolean> {
    return this.httpLoadingBackups.asObservable();
  }
  get statusAttendance(): Observable<boolean> {
    return this.httpLoadingAttendance.asObservable()
  }
  get statusDetails(): Observable<number[]> {
    return this.httpLoadingDetails.asObservable();
  }
  get statusDetailsAdd(): Observable<string[]> {
    return this.httpAddingDetails.asObservable();
  }
  get statusEditingAttendance(): Observable<number[]> {
    return this.httpEditingAttendance.asObservable();
  }

}

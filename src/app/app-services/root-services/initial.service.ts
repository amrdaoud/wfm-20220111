import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, map, Observable, of, Subject, tap } from 'rxjs';
import { AppUser } from 'src/app/app-models/root-models/app-user';
import { ActiveSchedule } from 'src/app/app-models/schedules';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitialService {
private appUser = new BehaviorSubject<any>(null);
private currentScheduleSubject = new BehaviorSubject<any>(null);
// private rolesP: string[] = [];
// private currentScheduleP!: ActiveSchedule;
isHttpLoading = new BehaviorSubject<boolean>(false);
isScheduleLoading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getUserInfo();
    this.getCurrentSchedule();
   }
  getUserInfo(): void {
    this.isHttpLoading.next(true);
    this.http.get<AppUser>(environment.apiUrl + 'users').pipe(
      tap(x => {
        this.appUser.next(x);
      }),
      finalize(() => {
        this.isHttpLoading.next(false);
      })
    ).subscribe();
  }




  getCurrentSchedule(): void {
    this.isScheduleLoading.next(true);
    this.http.get<ActiveSchedule>(environment.apiUrl + 'ScheduleWithRule/current').pipe(
      tap(x => {
        this.currentScheduleSubject.next(x);
      }),
      finalize(() => {
        this.isScheduleLoading.next(false);
      })
    ).subscribe();
  }
  get user(): Observable<AppUser> {
    return this.appUser.pipe(
      filter(u => u !== undefined && u !== null && u.Roles !== undefined && u.Roles !== null)
    );
  }
  get status(): Observable<boolean> {
    return this.isHttpLoading.asObservable();
  }
  get statusSchedule(): Observable<boolean> {
    return this.isScheduleLoading.asObservable();
  }
  get currentSchedule(): Observable<ActiveSchedule> {
    return this.currentScheduleSubject.pipe(
      filter(s => s !== undefined && s !== null)
    );
  }
  inRoles(roles: string[]): Observable<boolean> {
    return this.user.pipe(
      map(u => {
        return u.Roles.includes('SuperUser') || roles.find(x => u.Roles.includes(x)) !== undefined
      })
    )
  }
  changeUserName(name: string) {
    this.appUser.value.Alias = name;
    this.appUser.next(this.appUser.value);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DailyAttendancePattern } from '../app-models/attendance-pattern';
import { UploadDataGuard } from '../app-models/day-offs';
import { StaffMember } from '../app-models/resources';
import { ScheduleDetailManipulate } from '../app-models/schedule-details';

@Injectable({
  providedIn: 'root'
})
export class AttendancePatternService {
  private url = environment.apiUrl + 'DailyAttendancePattern/';
  private isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  createForm(model: DailyAttendancePattern): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model?.Id ?? 0),
      ScheduleId: new FormControl(model?.ScheduleId, Validators.required),
      StaffMemberId: new FormControl(model?.StaffMemberId, Validators.required),
      SublocationId: new FormControl(model?.SublocationId, Validators.required),
      TransportationId: new FormControl(model?.TransportationId, Validators.required),
      DayOffs: new FormControl(model?.DayOffs, Validators.required)
    });
    return frm;
  }
  getAllPatterns(): Observable<DailyAttendancePattern[]> {
    this.isLoading$.next(true);
    return this.http.get<DailyAttendancePattern[]>(this.url).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }
  addPattern(model: DailyAttendancePattern): Observable<DailyAttendancePattern> {
    this.isLoading$.next(true);
    return this.http.post<DailyAttendancePattern>(this.url, model).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }
  uplaodPatterns(model: UploadDataGuard[]): Observable<boolean> {
    this.isLoading$.next(true);
    return this.http.post<boolean>(this.url + 'upload', model).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }
  deletePattern(id: number): Observable<boolean> {
    this.isLoading$.next(true);
    return this.http.delete<boolean>(this.url + id).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  generateSchedule(): Observable<boolean> {
    this.isLoading$.next(true);
    return this.http.get<boolean>(this.url + 'generate').pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  getEligibleStaffMembers(selectedElements: ScheduleDetailManipulate[]): Observable<StaffMember[]> {
    return this.http.post<StaffMember[]>(this.url + 'eligible', selectedElements);
  }

  get isLoading():Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwapRequest, SwapRequestApprovalBinding, SwapRequestBinding } from 'src/app/app-models/swap-requests';
import { environment } from 'src/environments/environment';
import { DailyAttendance, DailyAttendanceByStaff, DailyAttendanceInfo } from 'src/app/app-models/schedule-details';
import { StaffMember } from 'src/app/app-models/resources';
import { Schedule } from 'src/app/app-models/schedules';

@Injectable({
  providedIn: 'root'
})
export class SwapRequestService {
private httpLoading = new BehaviorSubject<boolean>(false);
private httpLoadingSchedules = new BehaviorSubject<boolean>(false);
private httpLoadingMyDayOffs = new BehaviorSubject<boolean>(false);
private httpLoadingMySiblings = new BehaviorSubject<boolean>(false);
private httpLoadingDestinationDayOffs = new BehaviorSubject<boolean>(false);
private httpAdding = new BehaviorSubject<boolean>(false);
private myRequestsSubject = new BehaviorSubject<SwapRequest[]>([]);
  constructor(private http: HttpClient) {
    this.getInvolved();
  }

  getInvolved(): void {
    this.httpLoading.next(true);
    this.http.get<SwapRequest[]>(environment.apiUrl + `swaprequests/involved`).pipe(
      tap(x => this.myRequestsSubject.next(x)),
      finalize(() => {
        this.httpLoading.next(false)
      })
    ).subscribe();
  }
  getMySchedules(): Observable<Schedule[]> {
    this.httpLoadingSchedules.next(true);
    return this.http.get<Schedule[]>(environment.apiUrl + `swaprequests/myschedules`).pipe(
      finalize(() => {
        this.httpLoadingSchedules.next(false)
      })
    );
  }
  getMyDayoffs(scheduleId: number): Observable<DailyAttendanceByStaff> {
    this.httpLoadingMyDayOffs.next(true);
    return this.http.get<DailyAttendanceByStaff>(environment.apiUrl +  `swaprequests/mydayoffs/${scheduleId}`).pipe(
      finalize(() => {
        this.httpLoadingMyDayOffs.next(false);
      })
    )
  }
  getMySiblings(scheduleId: number): Observable<StaffMember[]> {
    this.httpLoadingMySiblings.next(true);
    return this.http.get<StaffMember[]>(environment.apiUrl +  `swaprequests/MySiblings/${scheduleId}`).pipe(
      finalize(() => {
        this.httpLoadingMySiblings.next(false);
      })
    )
  }

  getDestinationDayOffs(staffId: number, scheduleId: number): Observable<DailyAttendanceInfo[]> {
    this.httpLoadingDestinationDayOffs.next(true);
    return this.http.get<DailyAttendanceInfo[]>(environment.apiUrl +  `swaprequests/DestDayOffs/${staffId}/${scheduleId}`).pipe(
      finalize(() => {
        this.httpLoadingDestinationDayOffs.next(false);
      })
    )
  }
  addRequest(model: SwapRequestBinding): Observable<SwapRequestBinding> {
    this.httpAdding.next(true);
    return this.http.post<SwapRequestBinding>(environment.apiUrl +  `swaprequests`, model).pipe(
      finalize(() => {
        this.httpAdding.next(false);
      })
    )
  }
  handleRequest(model: SwapRequestApprovalBinding): Observable<SwapRequest> {
    this.httpLoading.next(true);
    return this.http.post<SwapRequest>(environment.apiUrl +  `swaprequests/handle`, model).pipe(
      tap(x => {
        let element = this.myRequestsSubject.value.find(l => l.Id === model.RequestId);
        if(element) {
          const index = this.myRequestsSubject.value.indexOf(element);
          this.myRequestsSubject.value[index] = x;
          this.myRequestsSubject.next(this.myRequestsSubject.value);
        }
      }),
      finalize(() => {
        this.httpLoading.next(false);
      })
    )
  }

  reverseRequest(requestId: number): Observable<SwapRequest> {
    this.httpLoading.next(true);
    return this.http.get<SwapRequest>(environment.apiUrl +  `swaprequests/reverse/${requestId}`).pipe(
      tap(x => {
        let element = this.myRequestsSubject.value.find(l => l.Id === requestId);
        if(element) {
          const index = this.myRequestsSubject.value.indexOf(element);
          this.myRequestsSubject.value[index] = x;
          this.myRequestsSubject.next(this.myRequestsSubject.value);
        }
      }),
      finalize(() => {
        this.httpLoading.next(false);
      })
    )
  }


  createForm(): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(0),
      ScheduleId: new FormControl('', Validators.required),
      SourceDailyAttendanceId: new FormControl('', Validators.required),
      Responder: new FormControl('', Validators.required),
      DestinationDailyAttendanceId: new FormControl('', Validators.required),
      RequesterAlias: new FormControl('system', Validators.required)
    });
    return frm;
  }

  get myRequests(): Observable<SwapRequest[]> {
    return this.myRequestsSubject.asObservable();
  }
  get status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  get statusMySchedules(): Observable<boolean> {
    return this.httpLoadingSchedules.asObservable();
  }
  get statusMyDayOffs(): Observable<boolean> {
    return this.httpLoadingMyDayOffs.asObservable();
  }
  get statusMySiblings(): Observable<boolean> {
    return this.httpLoadingMySiblings.asObservable();
  }
  get statusDestinationDayOffs(): Observable<boolean> {
    return this.httpLoadingDestinationDayOffs.asObservable();
  }
  get statusAdding(): Observable<boolean> {
    return this.httpAdding.asObservable();
  }
}

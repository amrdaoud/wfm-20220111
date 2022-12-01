import { DayOffReportData, UploadData } from './../../app-models/day-offs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AttendanceApprovalModel, AttendanceType, UserChoice, UserChoiceBinding } from 'src/app/app-models/day-offs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {
  private attendanceTypesSubject = new BehaviorSubject<AttendanceType[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private httpLoadingTypes = new BehaviorSubject<boolean>(false);
  // private httpLoadingApproving = new BehaviorSubject<boolean>(false);
  private httpLoadingCreating = new BehaviorSubject<boolean>(false);
  private approvedDataSubject = new BehaviorSubject<UserChoice[]>([]);
  private needApprovalDataSubject = new BehaviorSubject<UserChoice[]>([]);
  private loadingApproveItemsSubject = new BehaviorSubject<number[]>([]);
  private loadingEditItemsSubject = new BehaviorSubject<number[]>([]);
  private reportResultSubject = new BehaviorSubject<DayOffReportData[]>(this.initializeReport());
  // private destroy$ = new Subject<boolean>();
  constructor(private http: HttpClient) {
    this.getAllAttendanceTypes();
    this.createReport();
  }
  private getAllAttendanceTypes() {
    this.httpLoadingTypes.next(true);
    this.http.get<AttendanceType[]>(environment.apiUrl + 'DayyOffWithBreak/GetAttendanceType').pipe(
      map(x => x.filter(y => !y.IsAbsence && y.Hidden)),
      tap(x => this.attendanceTypesSubject.next(x)),
      finalize(() => this.httpLoadingTypes.next(false))
    ).subscribe();
  }

  getUserChoices(): Observable<UserChoice[]> {
    this.httpLoading.next(true);
    return this.http.get<UserChoice[]>(environment.apiUrl + 'DayyOffWithBreak').pipe(
      tap(x => this.approvedDataSubject.next(x.filter(y => y.DayOption1?.IsApproved
        || y.DayOption2?.IsApproved
        || y.DayOption3?.IsApproved
        || y.DayOption4?.IsApproved))),
      tap(x => this.needApprovalDataSubject.next(x.filter(y => !(y.DayOption1?.IsApproved
        || y.DayOption2?.IsApproved
        || y.DayOption3?.IsApproved
        || y.DayOption4?.IsApproved)))),
      finalize(() => this.httpLoading.next(false))
    )
  }
  getUserChoicesById(id: number): Observable<UserChoice> {
    this.httpLoading.next(true);
    return this.http.get<UserChoice>(environment.apiUrl + `DayyOffWithBreak/GetById?empid=${id}`).pipe(
      finalize(() => this.httpLoading.next(false))
    )
  }
  getUserChoicesByAlias(): Observable<UserChoice> {
    this.httpLoading.next(true);
    return this.http.get<UserChoice>(environment.apiUrl + `DayyOffWithBreak/GetByAlias`).pipe(
      finalize(() => this.httpLoading.next(false))
    )
  }
  approve(model: AttendanceApprovalModel): Observable<UserChoice> {
    this.loadingApproveItemsSubject.next([...this.loadingApproveItemsSubject.value,model.StaffMemberId]);
    return this.http.post<UserChoice>(environment.apiUrl + 'DayyOffWithBreak/Approve', model).pipe(
      tap(result => {
        this.approvedDataSubject.next([...this.approvedDataSubject.value,result]);
        let element = this.needApprovalDataSubject.value
        .find(l => l.StaffMemberId == model.StaffMemberId && l.ScheduleId == model.ScheduleId);
        if(element) {
          const index = this.needApprovalDataSubject.value.indexOf(element);
          this.needApprovalDataSubject.value.splice(index,1);
          this.needApprovalDataSubject.next(this.needApprovalDataSubject.value);
      }
      }),
      finalize(() => {
        const index = this.loadingApproveItemsSubject.value.indexOf(model.StaffMemberId);
        this.loadingApproveItemsSubject.value.splice(index,1);
        this.loadingApproveItemsSubject.next(this.loadingApproveItemsSubject.value);
      })
    );
  }
  edit(model: AttendanceApprovalModel): Observable<UserChoice> {
    this.loadingEditItemsSubject.next([...this.loadingEditItemsSubject.value,model.StaffMemberId]);
    return this.http.post<UserChoice>(environment.apiUrl + 'DayyOffWithBreak/Approve', model).pipe(
      tap(result => {
        let element = this.approvedDataSubject.value
        .find(l => l.StaffMemberId == model.StaffMemberId && l.ScheduleId == model.ScheduleId);
        if(element) {
        const index = this.approvedDataSubject.value.indexOf(element);
        this.approvedDataSubject.value[index] = result;
        this.approvedDataSubject.next(this.approvedDataSubject.value);
      }
      }),
      finalize(() => {
        const index = this.loadingEditItemsSubject.value.indexOf(model.StaffMemberId);
        this.loadingEditItemsSubject.value.splice(index,1);
        this.loadingEditItemsSubject.next(this.loadingEditItemsSubject.value);
      })
    );
  }
  addUserChoice(model: UserChoiceBinding): Observable<any> {
    this.httpLoading.next(true);
    return this.http.post<any>(environment.apiUrl + 'DayyOffWithBreak', model).pipe(
      finalize(() => this.httpLoading.next(false))
    );
  }
  editUserChoice(model: UserChoiceBinding): Observable<any> {
    this.httpLoading.next(true);
    return this.http.post<any>(environment.apiUrl + 'DayyOffWithBreak/edit', model).pipe(
      finalize(() => this.httpLoading.next(false))
    );
  }
  createAttendance(): Observable<boolean> {
    this.httpLoadingCreating.next(true);
    return this.http.get<boolean>(environment.apiUrl + 'dailyattendances/createattendance').pipe(
      finalize(() => this.httpLoadingCreating.next(false))
    )
  }
  uploadDayOffWithBreaks(models:UploadData[]): Observable<boolean> {
    this.httpLoading.next(true);
    return this.http.post<boolean>(environment.apiUrl + 'DayyOffWithBreak/upload', models).pipe(
      finalize(() => this.httpLoading.next(false))
    );
  }


  createReport() {
    this.approvedDataSubject.pipe(
      tap(data => {
        const reportResult = this.initializeReport();
        data.forEach(element => {
          const approved = element.DayOption1?.IsApproved ? element.DayOption1.Days :
                            element.DayOption2?.IsApproved ? element.DayOption2.Days :
                            element.DayOption3?.IsApproved ? element.DayOption3.Days :
                            element.DayOption4?.Days;
          if(approved) {
            const weekDays = reportResult.filter(r => approved.includes(r.WeekDay));
            weekDays.forEach(day => {
              const shift = day.ShiftData.find(s => s.ShiftName === element.ShiftName)
              if(shift) {
                shift.Count++;
              } else {
                day.ShiftData.push({ShiftName: element.ShiftName, Count: 1})
              }
              day.TotalCount++;
            });
          }
        });
        this.reportResultSubject.next(reportResult);
      })
    )
    .subscribe()
  }
  initializeReport(): DayOffReportData[] {
    const reportResult = [];
    reportResult.push(new DayOffReportData('Sunday'));
    reportResult.push(new DayOffReportData('Monday'));
    reportResult.push(new DayOffReportData('Tuesday'));
    reportResult.push(new DayOffReportData('Wednesday'));
    reportResult.push(new DayOffReportData('Thursday'));
    reportResult.push(new DayOffReportData('Friday'));
    reportResult.push(new DayOffReportData('Saturday'));
    return reportResult;
  }

  attendanceTypes(): Observable<AttendanceType[]> {
    return this.attendanceTypesSubject.asObservable();
  }
  typeStatus(): Observable<boolean> {
    return this.httpLoadingTypes.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  creatingStatus(): Observable<boolean> {
    return this.httpLoadingCreating.asObservable();
  }
  approvedData(): Observable<UserChoice[]> {
    return this.approvedDataSubject.asObservable();
  }
  needApprovalData(): Observable<UserChoice[]> {
    return this.needApprovalDataSubject.asObservable();
  }
  loadingApproveItems(): Observable<number[]> {
    return this.loadingApproveItemsSubject.asObservable();
  }
  LoadingEditItems():Observable<number[]> {
    return this.loadingEditItemsSubject.asObservable();
  }
  reportData(): Observable<DayOffReportData[]> {
    return this.reportResultSubject.asObservable();
  }
  createApprovalForm(model: UserChoice): FormGroup {
    const frm = new FormGroup({
      StaffMemberId: new FormControl(model?.StaffMemberId, Validators.required),
      ScheduleId: new FormControl(model?.ScheduleId, Validators.required),
      AcceptedBreakTypeOption: new FormControl(model?.AttendenceTypeId, [Validators.required, Validators.min(1)]),
      ShiftId: new FormControl(model?.ShiftId, [Validators.required, Validators.min(1)]),
      AccepedDayOffInfo: new FormGroup({
        Id: new FormControl(
          model?.DayOption1?.IsApproved ? model?.DayOption1?.Id :
          model?.DayOption2?.IsApproved ? model?.DayOption2?.Id :
          model?.DayOption3?.IsApproved ? model?.DayOption3?.Id :
          model?.DayOption4?.IsApproved ? model?.DayOption4?.Id : 0),
        Day1: new FormControl(
          model?.DayOption1?.IsApproved ? model?.DayOption1?.Days[0] :
          model?.DayOption2?.IsApproved ? model?.DayOption2?.Days[0] :
          model?.DayOption3?.IsApproved ? model?.DayOption3?.Days[0] :
          model?.DayOption4?.IsApproved ? model?.DayOption4?.Days[0] : ''
        , Validators.required),
        Day2: new FormControl(
          model?.DayOption1?.IsApproved ? model?.DayOption1?.Days[1] :
          model?.DayOption2?.IsApproved ? model?.DayOption2?.Days[1] :
          model?.DayOption3?.IsApproved ? model?.DayOption3?.Days[1] :
          model?.DayOption4?.IsApproved ? model?.DayOption4?.Days[1] : ''
        , Validators.required)
      }, Validators.required)
    })
    return frm;
  }
  createDayOffForm(model: UserChoice): FormGroup {
    const frm = new FormGroup({
      StaffMemberId: new FormControl(model?.StaffMemberId, Validators.required),
      ScheduleId: new FormControl(model?.ScheduleId, Validators.required),
      AttendenceTypeId: new FormControl(model?.AttendenceTypeId, [Validators.required, Validators.min(1)]),
      DayOption1: new FormGroup({
        Days: new FormControl(model?.DayOption1?.Days, [Validators.required, Validators.maxLength(2), Validators.maxLength(2)]),
        IsApproved: new FormControl(model?.DayOption1?.IsApproved)
      }, Validators.required),
      DayOption2: new FormGroup({
        Days: new FormControl(model?.DayOption2?.Days, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        IsApproved: new FormControl(model?.DayOption2?.IsApproved)
      }, Validators.required),
      DayOption3: new FormGroup({
        Days: new FormControl(model?.DayOption3?.Days, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        IsApproved: new FormControl(model?.DayOption3?.IsApproved)
      }, Validators.required),
      DayOption4: new FormGroup({
        Days: new FormControl({value: model?.DayOption4?.Days, disabled: true}),
        IsApproved: new FormControl(model?.DayOption4?.IsApproved)
      })
    });
    if(model?.DayOption1?.IsApproved || model?.DayOption2?.IsApproved ||model?.DayOption3?.IsApproved ||model?.DayOption4?.IsApproved) {
      frm.disable();
    }
    return frm;
  }
}

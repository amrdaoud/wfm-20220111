import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { AttendanceType } from 'src/app/app-models/attendance-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AttendanceTypeService {
  private attendanceSubject = new BehaviorSubject<AttendanceType[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.getAll();
  }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<AttendanceType[]>(environment.apiUrl + 'attendancetypes').pipe(
      tap(x => this.attendanceSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }

  add(model: AttendanceType): void {
    this.httpLoading.next(true);
    this.http.post<AttendanceType>(environment.apiUrl + 'attendancetypes', model).pipe(
      tap(x => this.attendanceSubject.next([...this.attendanceSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }

  edit(id: number,model: AttendanceType): void {
    this.httpLoading.next(true);
    this.http.put<AttendanceType>(environment.apiUrl + `attendancetypes/${id}`, model).pipe(
      tap(x => {
        let element = this.attendanceSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.attendanceSubject.value.indexOf(element);
          this.attendanceSubject.value[index] = x;
          this.attendanceSubject.next(this.attendanceSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }

  get attendanceTypes() : Observable<AttendanceType[]> {
    return this.attendanceSubject.asObservable();
  }
  get status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  createForm(model?: AttendanceType): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)
      }),
      IsAbsence: new FormControl({value: model ? model.IsAbsence : '', disabled: model?.DisableEdit}, Validators.required),
      Hidden: new FormControl(false),
      DefaultActivityId: new FormControl({value:model? model.DefaultActivityId : '',disabled: model?.DisableEdit}, Validators.required),
      DisableEdit: new FormControl(false)
    });
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + `attendancetypes/checkname?name=${control.value}`).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }

  get isCkeckingName(): Observable<boolean> {
    return this.checkingName.asObservable();
  }
}

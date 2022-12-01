import { Shift } from './../../app-models/ShiftsAndActivities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


export const shiftDuration: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const earlyStart = control.get('EarlyStart');
  const lateEnd = control.get('LateEnd');
  const duration = control.get('ShiftDuration');
  if(!earlyStart?.value || !lateEnd?.value  || !duration?.value) {
    return null;
  }
  const earlyStartDate = new Date(2000,0,1,earlyStart.value.split(':')[0],earlyStart.value.split(':')[1]);
  const lateEndtDate = new Date(2000,0,1,lateEnd.value.split(':')[0],lateEnd.value.split(':')[1]);
  if(lateEndtDate < earlyStartDate) {
    lateEndtDate.setDate(lateEndtDate.getDate() + 1);
  }
  return ((lateEndtDate.getTime() - earlyStartDate.getTime()) < (duration.value * 3600000)) ? { durationError: true } : null;
};

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private shiftsSubject = new BehaviorSubject<Shift[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }

  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<Shift[]>(environment.apiUrl + 'shift').pipe(
      tap(x => this.shiftsSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: Location): void {
    this.httpLoading.next(true);
    this.http.post<Shift>(environment.apiUrl + 'shift', model).pipe(
      tap(x => this.shiftsSubject.next([...this.shiftsSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: Location): void {
    this.httpLoading.next(true);
    this.http.put<Shift>(environment.apiUrl + `shift/${id}`, model).pipe(
      tap(x => {
        let element = this.shiftsSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.shiftsSubject.value.indexOf(element);
          this.shiftsSubject.value[index] = x;
          this.shiftsSubject.next(this.shiftsSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  shifts(): Observable<Shift[]> {
    return this.shiftsSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  createForm(model?: Shift): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)
      }),
      EarlyStart: new FormControl(model?.EarlyStart,Validators.required),
      LateEnd: new FormControl(model?.LateEnd, Validators.required),
      ShiftDuration: new FormControl(model? model.ShiftDuration : 8, Validators.required)
    }, shiftDuration);
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + `Shift/checkUniqe?value=${control.value}&ignoreName=wwwwwwwwww`).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }
  get isCheckingName(): Observable<boolean> {
    return this.checkingName.asObservable();
  }
}

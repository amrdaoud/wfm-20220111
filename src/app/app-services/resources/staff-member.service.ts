import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { StaffMember } from 'src/app/app-models/resources';
import { DynamicTableByndingModel, DynamicTableResult } from 'src/app/app-models/shared/table-config';
import { environment } from 'src/environments/environment';

export const staffHireStartFormValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const hireDate = control.get('HireDate');
  const startDate = control.get('StartDate');

  return hireDate && startDate  &&  (new Date(hireDate.value) > new Date(startDate.value)) ? { hireStart: true } : null;
};
export const staffStartLeaveFormValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const startDate = control.get('StartDate');
  const  leaveDate = control.get('LeaveDate');

  return leaveDate && startDate  &&  (new Date(startDate.value) > new Date(leaveDate.value)) ? { startLeave: true } : null;
};
@Injectable({
  providedIn: 'root'
})

export class StaffMemberService {
bindingModel = new DynamicTableByndingModel();
private staffMembersSubject = new BehaviorSubject<StaffMember[]>([]);
private resultsSizeSubject = new BehaviorSubject<number>(0);
private httpLoading = new BehaviorSubject<boolean>(false);
private checkingEmployeeId = new BehaviorSubject<boolean>(false);
private checkingName = new BehaviorSubject<boolean>(false);
private checkingAlias = new BehaviorSubject<boolean>(false);
private checkingEmail = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  getAll(): Observable<StaffMember[]> {
    this.httpLoading.next(true);
    return this.http.post<DynamicTableResult>(environment.apiUrl + 'staffmember/getfilter', this.bindingModel).pipe(
      tap(x => {
        this.staffMembersSubject.next(x.Result);
        this.resultsSizeSubject.next(x.ResultSize);
      }),
      map(x => x.Result),
      finalize(() => this.httpLoading.next(false))
    )
  }
  getByFilter(filter: DynamicTableByndingModel): Observable<StaffMember[]> {
    this.httpLoading.next(true);
    return this.http.post<DynamicTableResult>(environment.apiUrl + 'staffmember/getfilter', filter).pipe(
      map(x => x.Result),
      finalize(() => this.httpLoading.next(false))
    )
  }
  getById(id: number): Observable<StaffMember> {
    return this.http.get<StaffMember>(environment.apiUrl + `staffmember/${id}`);
  }
  add(model: StaffMember): Observable<StaffMember> {
    this.httpLoading.next(true);
    return this.http.post<StaffMember>(environment.apiUrl + 'staffmember', model).pipe(
      finalize(() => this.httpLoading.next(false))
    )
  }
  edit(id: number,model: StaffMember): Observable<StaffMember> {
    this.httpLoading.next(true);
    return this.http.put<StaffMember>(environment.apiUrl + `staffmember/${id}`, model).pipe(
      finalize(() => this.httpLoading.next(false))
    );
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  staffMembers(): Observable<StaffMember[]> {
    return this.staffMembersSubject.asObservable();
  }
  resultsSize(): Observable<number> {
    return this.resultsSizeSubject.asObservable();
  }
  createForm(model?: StaffMember): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)
      }),
      Alias: new FormControl(model?.Alias, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateAlias(model?.Alias)
      }),
      EmployeeId: new FormControl(model?.EmployeeId, {
        updateOn: 'blur',
        validators : [Validators.required],
        asyncValidators: this.validateEmployeeId(model?.EmployeeId)
      }),
      Email: new FormControl(model?.Email, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.email],
        asyncValidators: this.validateEmail(model?.Email)
      }),
      PhoneNumber: new FormControl(model?.PhoneNumber),
      Gender: new FormControl(model?.Gender),
      Language: new FormControl(model?.Language),
      Address: new FormControl(model?.Address),
      Note: new FormControl(model?.Note),
      StartDate: new FormControl(model? new Date(model.StartDate) : '', Validators.required),
      LeaveDate: new FormControl(model? new Date(model.LeaveDate) : new Date(2400,11,31), Validators.required),
      HeadOfSectionId: new FormControl(model?.HeadOfSectionId, Validators.required),
      LocationId: new FormControl(model?.LocationId),
      TransportationRouteId: new FormControl(model?.TransportationRouteId, Validators.required),
      StaffTypeId: new FormControl(model?.StaffTypeId, Validators.required),
      Religion: new FormControl(model?.Religion),
      EstimatedLeaveDays: new FormControl(model?.EstimatedLeaveDays),
      HireDate: new FormControl(model? new Date(model.HireDate) : '')
    }, [staffHireStartFormValidator, staffStartLeaveFormValidator]);
    return frm;
  }

  validateEmployeeId(current?: number): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingEmployeeId.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'staffmember/checkUniq?value=' + control.value).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingEmployeeId.next(false))
      );
    }
  }
  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'staffmember/CheckNameValue?Name=' + control.value).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }
  validateAlias(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingAlias.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'staffmember/checkAliasValue?Alias=' + control.value).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingAlias.next(false))
      );
    }
  }
  validateEmail(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingEmail.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'staffmember/checkEmailvalue?Email=' + control.value).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingEmail.next(false))
      );
    }
  }

  get isCheckingEmployeeId(): Observable<boolean> {
    return this.checkingEmployeeId.asObservable();
  }
  get isCheckingName(): Observable<boolean> {
    return this.checkingName.asObservable();
  }
  get isCheckingAlias(): Observable<boolean> {
    return this.checkingAlias.asObservable();
  }
  get isCheckingEmail(): Observable<boolean> {
    return this.checkingEmail.asObservable();
  }
}

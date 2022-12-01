import { HeadOfSection } from './../../app-models/resources';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HeadOfSectionService {
  private headSubject = new BehaviorSubject<HeadOfSection[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingEmployeeId = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  private checkingAlias = new BehaviorSubject<boolean>(false);
  private checkingEmail = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<HeadOfSection[]>(environment.apiUrl + 'headofsection').pipe(
      tap(x => this.headSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: HeadOfSection): void {
    this.httpLoading.next(true);
    this.http.post<HeadOfSection>(environment.apiUrl + 'headofsection', model).pipe(
      tap(x => this.headSubject.next([...this.headSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: HeadOfSection): void {
    this.httpLoading.next(true);
    this.http.put<HeadOfSection>(environment.apiUrl + `headofsection/${id}`, model).pipe(
      tap(x => {
        let element = this.headSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.headSubject.value.indexOf(element);
          this.headSubject.value[index] = x;
          this.headSubject.next(this.headSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  headOfSections(): Observable<HeadOfSection[]> {
    return this.headSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }

  createForm(model?: HeadOfSection): FormGroup {
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
      Gender: new FormControl(model?.Gender),
      Language: new FormControl(model?.Language),
      Address: new FormControl(model?.Address),
      Note: new FormControl(model?.Note),
    });
    return frm;
  }
  validateEmployeeId(current?: number): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingEmployeeId.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'headofsection/checkUniq?employeeId=' + control.value).pipe(
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
      return this.http.get<boolean>(environment.apiUrl + 'headofsection/CheckNameValue?Name=' + control.value).pipe(
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
      return this.http.get<boolean>(environment.apiUrl + 'headofsection/checkAliasValue?Alias=' + control.value).pipe(
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
      return this.http.get<boolean>(environment.apiUrl + 'headofsection/checkEmailvalue?Email=' + control.value).pipe(
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

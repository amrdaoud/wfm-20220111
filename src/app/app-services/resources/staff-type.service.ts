import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { StaffType } from 'src/app/app-models/resources';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffTypeService {
  private staffTypeSubject = new BehaviorSubject<StaffType[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<StaffType[]>(environment.apiUrl + 'stafftype').pipe(
      tap(x => this.staffTypeSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: StaffType): void {
    this.httpLoading.next(true);
    this.http.post<StaffType>(environment.apiUrl + 'stafftype', model).pipe(
      tap(x => this.staffTypeSubject.next([...this.staffTypeSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: StaffType): void {
    this.httpLoading.next(true);
    this.http.put<StaffType>(environment.apiUrl + `stafftype/${id}`, model).pipe(
      tap(x => {
        let element = this.staffTypeSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.staffTypeSubject.value.indexOf(element);
          this.staffTypeSubject.value[index] = x;
          this.staffTypeSubject.next(this.staffTypeSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  staffTypes():Observable<StaffType[]> {
    return this.staffTypeSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }

  createForm(model?: StaffType): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name),
        updateOn: 'blur'
      }),
      Description: new FormControl(model?.Description)
    });
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toLowerCase() === control.value.toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'staffType/checkUniq?value=' + control.value).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }
  isCkeckingName():Observable<boolean> {
    return this.checkingName.asObservable();
  }
}

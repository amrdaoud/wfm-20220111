import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { getTimeFromDate } from 'src/app/app-helpers/date-helper';
import { environment } from 'src/environments/environment';
import { Transportation } from '../../app-models/resources';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  private transportationSubject = new BehaviorSubject<Transportation[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<Transportation[]>(environment.apiUrl + 'transportationroute').pipe(
      tap(x => this.transportationSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: Transportation): void {
    this.httpLoading.next(true);
    this.http.post<Transportation>(environment.apiUrl + 'transportationroute', model).pipe(
      tap(x => this.transportationSubject.next([...this.transportationSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: Transportation): void {
    this.httpLoading.next(true);
    this.http.put<Transportation>(environment.apiUrl + `transportationroute/${id}`, model).pipe(
      tap(x => {
        let element = this.transportationSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.transportationSubject.value.indexOf(element);
          this.transportationSubject.value[index] = x;
          this.transportationSubject.next(this.transportationSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  transportations(): Observable<Transportation[]> {
    return this.transportationSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  createForm(model?: Transportation): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name),
        updateOn: 'blur'
      }),
      LocationId: new FormControl(model?.LocationId, Validators.required),
      ArriveTime: new FormControl(model? getTimeFromDate(model.ArriveTime) : '',Validators.required),
      DepartTime: new FormControl(model? getTimeFromDate(model.DepartTime) : '', Validators.required),
      Description: new FormControl(model?.Description),
      IsIgnored: new FormControl(model ? model.IsIgnored : false)
    });
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toLowerCase() === control.value.toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'transportationRoute/checkUniq?value=' + control.value).pipe(
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

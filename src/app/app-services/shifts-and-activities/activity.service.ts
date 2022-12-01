import { Activity } from './../../app-models/ShiftsAndActivities';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  private checkingColor = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<Activity[]>(environment.apiUrl + 'activity').pipe(
      tap(x => this.activitiesSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: Activity): void {
    this.httpLoading.next(true);
    this.http.post<Activity>(environment.apiUrl + 'activity', model).pipe(
      tap(x => this.activitiesSubject.next([...this.activitiesSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: Activity): void {
    this.httpLoading.next(true);
    this.http.put<Activity>(environment.apiUrl + `activity/${id}`, model).pipe(
      tap(x => {
        let element = this.activitiesSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.activitiesSubject.value.indexOf(element);
          this.activitiesSubject.value[index] = x;
          this.activitiesSubject.next(this.activitiesSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  activities(): Observable<Activity[]> {
    return this.activitiesSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }

  createForm(model?: Activity): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name, {
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)
      }),
      Color: new FormControl(model?.Color, {
        updateOn: 'blur',
        validators : [Validators.required],
        asyncValidators: this.validateColor(model?.Color)
      }),
      IsPhone: new FormControl({value: model? model.IsPhone : false, disabled: model?.DisableEdit},Validators.required),
      IsAbsence: new FormControl({value: model? model.IsAbsence : false, disabled: model?.DisableEdit}, Validators.required),
      IsPaid: new FormControl({value: model? model.IsPaid : false, disabled: model?.DisableEdit}, Validators.required),
      IsWorkTime: new FormControl({value: model? model.IsWorkTime : false, disabled: model?.DisableEdit}, Validators.required),
    });
    return frm;
  }

  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + `Activity/checkUniqe?value=${control.value}&ignoreName=yyyyyyyyyy`).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingName.next(false))
      );
    }
  }

  validateColor(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      this.checkingColor.next(true);
      const val = control.value.toString().replace('#', '');
      return this.http.get<boolean>(environment.apiUrl + `Activity/checkUniqeColor?value=${val}&ignoreName=wwwwwwww`).pipe(
        map(res => res ? null : {isTaken: true}),
        catchError(() => of(null)),
        finalize(() => this.checkingColor.next(false))
      );
    }
  }

  get isCkeckingName(): Observable<boolean> {
    return this.checkingName.asObservable();
  }
  get isCkeckingColor(): Observable<boolean> {
    return this.checkingColor.asObservable();
  }
}

import { AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { BehaviorSubject, catchError,finalize, map, Observable, of, tap } from 'rxjs';
import { Location } from 'src/app/app-models/resources';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
private locationsSubject = new BehaviorSubject<Location[]>([]);
private httpLoading = new BehaviorSubject<boolean>(false);
private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<Location[]>(environment.apiUrl + 'locations').pipe(
      tap(x => this.locationsSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: Location): void {
    this.httpLoading.next(true);
    this.http.post<Location>(environment.apiUrl + 'locations', model).pipe(
      tap(x => this.locationsSubject.next([...this.locationsSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: Location): void {
    this.httpLoading.next(true);
    this.http.put<Location>(environment.apiUrl + `locations/${id}`, model).pipe(
      tap(x => {
        let element = this.locationsSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.locationsSubject.value.indexOf(element);
          this.locationsSubject.value[index] = x;
          this.locationsSubject.next(this.locationsSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  locations(): Observable<Location[]> {
    return this.locationsSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  createForm(model?: Location): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)}),
      Address: new FormControl(model?.Address),
      ContactPhone: new FormControl(model?.ContactPhone)
    });
    return frm;
  }
  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toLowerCase() === control.value.toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'locations/checkUniq?value=' + control.value).pipe(
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

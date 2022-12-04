import { SubLocation } from './../../app-models/resources';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SublocationService {
  private subLocationSubject = new BehaviorSubject<SubLocation[]>([]);
  private httpLoading = new BehaviorSubject<boolean>(false);
  private checkingName = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getAll();
   }
  getAll(): void {
    this.httpLoading.next(true);
    this.http.get<SubLocation[]>(environment.apiUrl + 'sublocation').pipe(
      tap(x => this.subLocationSubject.next(x)),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  add(model: SubLocation): void {
    this.httpLoading.next(true);
    this.http.post<SubLocation>(environment.apiUrl + 'sublocation', model).pipe(
      tap(x => this.subLocationSubject.next([...this.subLocationSubject.value,x])),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  edit(id: number,model: SubLocation): void {
    this.httpLoading.next(true);
    this.http.put<SubLocation>(environment.apiUrl + `sublocation/${id}`, model).pipe(
      tap(x => {
        let element = this.subLocationSubject.value.find(l => l.Id === id);
        if(element) {
          const index = this.subLocationSubject.value.indexOf(element);
          this.subLocationSubject.value[index] = x;
          this.subLocationSubject.next(this.subLocationSubject.value);
        }
      }),
      finalize(() => this.httpLoading.next(false))
    ).subscribe();
  }
  subLocations(): Observable<SubLocation[]> {
    return this.subLocationSubject.asObservable();
  }
  status(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }
  createForm(model?: SubLocation): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      Name: new FormControl(model?.Name,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        asyncValidators: this.validateName(model?.Name)}),
      LocationId: new FormControl(model?.LocationId, Validators.required)
    });
    return frm;
  }
  validateName(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toLowerCase() === control.value.toLowerCase()) {
        return of(null);
      }
      this.checkingName.next(true);
      return this.http.get<boolean>(environment.apiUrl + 'sublocation/checkUniq?value=' + control.value).pipe(
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

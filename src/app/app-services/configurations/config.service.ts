import { BehaviorSubject, map, Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ADUser, AppRoles, AppRolesMapping } from 'src/app/app-models/root-models/app-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
private pretendValue = '';
private isGettingAdSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  get pretend(): string {
    return this.pretendValue;
  }
  updatePretend(newPretend: string) {
    this.pretendValue = newPretend;
  }
  getRolesMapping(): Observable<AppRolesMapping> {
    return this.http.get<AppRoles>(environment.apiUrl + 'config/rolesmapping').pipe(
      map(result => {
        return new AppRolesMapping(result);
      })
    );
  }
  setRolesMapping(model: AppRolesMapping): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'config/rolesmapping', new AppRoles(model));
  }

  getADUsers(searchQuery: string): Observable<ADUser[]> {
    this.isGettingAdSubject.next(true);
    return this.http.get<ADUser[]>(environment.apiUrl + `activedirectory/users/${searchQuery}`).pipe(
      finalize(() => {
        this.isGettingAdSubject.next(false)
      })
    )
  }
  getADGroups(searchQuery: string): Observable<string[]> {
    this.isGettingAdSubject.next(true);
    return this.http.get<string[]>(environment.apiUrl + `activedirectory/groups/${searchQuery}`).pipe(
      finalize(() => {
        this.isGettingAdSubject.next(false)
      })
    );
  }
  createRolesForm(model: AppRolesMapping): FormGroup {
    const frm = new FormGroup({
      Groups: new FormGroup({
        Admin:new FormControl(model?.Groups.Admin),
        User:new FormControl(model?.Groups.User),
        Hos:new FormControl(model?.Groups.Hos),
      }),
      Users: new FormGroup({
        Admin:new FormControl(model?.Users.Admin),
        User:new FormControl(model?.Users.User),
        Hos:new FormControl(model?.Users.Hos),
      })
    });
    return frm;
  }
  get isGettingAD(): Observable<boolean> {
    return this.isGettingAdSubject.asObservable();
  }
}

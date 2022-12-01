import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, first, map, Observable, of, switchMap, tap} from 'rxjs';
import { InitialService } from '../app-services/root-services/initial.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private initialService:InitialService,
              private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!route.data['Roles']) {
      return of(true);
    }
    const result =  this.initialService.inRoles(route.data['Roles'] as Array<string>).pipe(
      tap(s => {
        if(!s) {
          this.router.navigateByUrl('/unauthorized')
        }
      })
    )
    return result;
  }
}



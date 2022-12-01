import { ConfigService } from './../app-services/configurations/config.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PretendInterceptor implements HttpInterceptor {

  constructor(private config:ConfigService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.config.pretend !== '') {
      const newRequest = request.clone({headers: request.headers.set('pretend', this.config.pretend)});
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}

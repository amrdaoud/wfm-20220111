import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from '../app-services/shared/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 0) {
          this.errorService.open(error.status,'Something went wrong please check your connection')
        }
        else if(error.status === 500) {
          this.errorService.open(error.status,'Something went wrong please report the error to developers')
        }
        else if(error.status === 401 || error.status === 403) {
          this.errorService.open(error.status,'Your are not authorized to perform this action')
        }
        else if(error && error.error && error.error.ErrorMessage) {
          this.errorService.open(error.status,error.error.ErrorMessage)
        } else if(error && error.message) {
          this.errorService.open(error.status,error.message)
        } else {
          this.errorService.open(error.status,JSON.stringify(error))
        }
        throw error;
      })
    )
  }
}

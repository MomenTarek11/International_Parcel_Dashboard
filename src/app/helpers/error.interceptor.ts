import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
// import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from "../components/auth/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    // private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.spinner.hide();
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

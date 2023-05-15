import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../components/auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.spinner.hide()
            console.log(err)
            // if ([401, 403].indexOf(err.status) !== -1) {
            //      this.authenticationService.logout();
            // }
            switch (err.status) {
                case 401:
                        this.toastr.error('ليس لديك صلاحيات',err.error.message);  
                    break;
                    case 404:
                        this.toastr.error(err.error.message);  
                    break;
                    case 422:
                        this.toastr.error(err.error.message);  
                    break;
                case 500:
                    this.toastr.error(
                    'حدث خطأ غير معروف. حاول لاحقًا','خطأ تقني');  
                    break;
                // case 400:
                //     for (const [key, value] of Object.entries(err.error.message)) {
                //         this.toastr.error(value[0],err.error.message);  
                //     }  
                //     break;
                default:
                    console.log('dsjfhsdk hkjhkjs dfhkjsdhjk ')
                    err.error.messages.forEach(error => {
                        this.toastr.error('يرجي التأكد من ادخال بيانات صحيحه',error);  
                    });
                    this.toastr.error(
                        'حدث خطأ غير معروف. حاول لاحقًا','خطأ تقني'); 
                    // console.log(err.error.messages)
                    // for (const [key, value] of err.error.messages) {
                    //     console.log(err.error.messages)
                    //     console.log(value)
                    //     this.toastr.error(value,err.error.messages[key]);  
                    // }
                    break;
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
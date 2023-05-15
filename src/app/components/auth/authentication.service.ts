import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router,private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(`${environment.currentUserKey}`)));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    if(this.currentUserSubject.value != null) { return this.currentUserSubject.value }        
  }
  login(form){
    const formData: FormData = new FormData();
    formData.append("email", form.phone);
    formData.append("password", form.password);
    // new Response(formData).text().then(console.log)
    return this.http.post(`${environment.endpoint}/backend/login`, formData)
    .pipe( map((user:any) => {
      console.log('userrrrrrrr')
      console.log(user)
      console.log(user)
      console.log(user)
        if (user && user.data.access_token) {
            localStorage.setItem(`${environment.currentUserKey}`, JSON.stringify(user));
            this.currentUserSubject.next(user);
        } return user;
    }));
    }
    logout() {
      localStorage.removeItem(`${environment.currentUserKey}`);
      this.currentUserSubject.next(null);
      this.router.navigate([''])
  }
    // register(form){
    //     const formData: FormData = new FormData();
    //     formData.append("type", '2'); /* 1 for user 2 for owner */
    //     formData.append("name", form.name);
    //     formData.append("storename", form.storename);
    //     formData.append("email", form.email);
    //     formData.append("phone", form.phone);
    //     formData.append("password", form.password);
    //     for (var i = 0; i < form.registry.length; i++) {
    //         formData.append("registry[" + i + "]", form.registry[i]);
    //     }
    //     new Response(formData).text().then(console.log)
    //     return this.http.post(`${environment.endpoint}/users/register`, formData)
    //     .pipe( map((user:any) => {
    //         if (user && user.token) {
    //             localStorage.setItem(`${environment.currentUserKey}`, JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //         } return user;
    //     })
    //     );
    // }

}

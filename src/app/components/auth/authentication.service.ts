import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(`${environment.currentUserKey}`))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    if (this.currentUserSubject.value != null) {
      return this.currentUserSubject.value;
    }
  }
  private setLocalStorageUser(user: any): void {
    localStorage.setItem(environment.currentUserKey, JSON.stringify(user));
  }

  private clearLocalStorageUser(): void {
    localStorage.removeItem(environment.currentUserKey);
  }
  updateCurrentUser(updatedUser: any): void {
    this.setLocalStorageUser(updatedUser);
    this.currentUserSubject.next(updatedUser);
  }
  login(form) {
    const formData: FormData = new FormData();
    formData.append("email", form.phone);
    formData.append("password", form.password);
    // new Response(formData).text().then(console.log)
    return this.http
      .post(`${environment.endpoint}/backend/login`, formData)
      .pipe(
        map((user: any) => {
          if (user && user.data.access_token) {
            localStorage.setItem(
              `${environment.currentUserKey}`,
              JSON.stringify(user)
            );
            localStorage.setItem(
              `Sha7nAdminToken`,
              JSON.stringify(user?.data?.access_token)
            );
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }
  logout() {
    this.clearLocalStorageUser();
    this.currentUserSubject.next(null);
    this.router.navigate([""]);
  }
}

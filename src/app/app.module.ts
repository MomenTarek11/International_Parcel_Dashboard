import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./components/auth/login/login.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
// import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from "./components/home/home.component";
import { WrongRouteComponent } from "./components/auth/errors/wrong-route/wrong-route.component";
import { ConnectionServiceModule } from "ng-connection-service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { CountriesComponent } from "./components/countries/countries.component";
import { PopUpComponent } from "./shared/pop-up/pop-up.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CitiesComponent } from "./components/cities/cities.component";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    LoginComponent,
    HomeComponent,
    WrongRouteComponent,
    CountriesComponent,
    PopUpComponent,
    CitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

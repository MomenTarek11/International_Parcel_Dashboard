import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
// import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public form: FormGroup;
  public togglePassword: boolean = false;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: AuthenticationService,
    private toaster: ToastrService
  ) {
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      phone: ["superadmin@superadmin.com", Validators.required],
      password: ["123456", Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    // this.spinner.show()
    this.service.login(this.form.value).subscribe((response: any) => {
      // this.spinner.hide()
      console.log(response);
      console.log(response);
      this.toaster.success("تم تسجيل الدخول بنجاح");
      // this.spinner.hide()
      // Swal.fire(
      //   `نجاح تسجيل الدخول`,
      //   `مرحباً بعودتك, يا أدمن`,
      //   `success`
      //   )
      this.router.navigate(["/home"]);
    });
  }
}

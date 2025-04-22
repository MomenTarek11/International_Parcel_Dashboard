import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
// import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  submitted: boolean = false;
  notEqual: boolean = false;
  form: FormGroup;


  uploadedImage: any;
  constructor(
    private fb: FormBuilder,
    private service: GlobalService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required],
      image: [null, Validators.required],
      permissions: [null, Validators.required],
    });
  }
  submit() {
 
  }
  get f() {
    return this.form.controls;
  }
  UploadImage(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
 
}

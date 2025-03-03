import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  form: FormGroup;
  categories;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: GlobalService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name_ar: [
        "",
        [Validators.nullValidator, Validators.pattern(/[\u0600-\u06FF]/)],
      ],
      name_en: ["", [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      name_cn: ["", Validators.required],
      plan_price: ["", Validators.required],
      ship_price: ["", Validators.required],
    });
  }

  submit() {
    this.spinner.show();
    this.service.addShipmentType(this.form.value).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.status == true) {
          this.toaster.success(res.message);
          this.router.navigate(["/app/shippment/list"]);
        } else {
          this.toaster.error(res.message);
        }
      },
      (err: any) => {
        this.spinner.hide();
        this.toaster.error(err.error.message);
      }
    );
  }
}

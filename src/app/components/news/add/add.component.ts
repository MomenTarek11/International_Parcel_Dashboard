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
      title_ar: [
        "",
        [Validators.nullValidator, Validators.pattern(/[\u0600-\u06FF]/)],
      ],
      title_en: ["", [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      title_cn: ["", Validators.required],
    });
  }

  submit() {
    this.spinner.show();
    this.service.addNews(this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.status == true) {
          this.toaster.success("تم اضافة الخبر بنجاح");
          this.router.navigate(["/app/news/list"]);
        } else {
          this.toaster.error(res.message);
        }
      },
      (err: any) => {
        this.spinner.hide();
        this.toaster.error(err.errors[0]);
      }
    );
  }
}

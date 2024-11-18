import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from "../countries.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CountriesService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      name_ar: ["", Validators.required],
      name_en: ["", Validators.required],
      name_cn: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.Form.valid) {
      this.service.addCountry(this.Form.value).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.toaster.success("تم اضافة الدولة بنجاح");
            this.Form.reset();
            this.router.navigate(["/app/countries"]);
          }
        },
        (err: any) => {
          this.toaster.error(err.message);
        }
      );
    }
  }
}

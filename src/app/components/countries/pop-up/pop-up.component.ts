import { Component, Inject, inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CountriesComponent } from "../countries.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from "../countries.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.scss"],
})
export class PopUpComponent {
  Form: FormGroup;
  Data: any;
  constructor(
    private data: MatDialogRef<CountriesComponent>,
    @Inject(MAT_DIALOG_DATA) public AllData: any,
    private fb: FormBuilder,
    private service: CountriesService,
    private spinner: NgxSpinnerService
  ) {
    this.Data = AllData;
  }
  ngOnInit(): void {
    this.Form = this.fb.group({
      name_ar: ["", Validators.required],
      name_en: ["", Validators.required],
      name_cn: ["", Validators.required],
    });
    if (this.Data.type === "edit") {
      this.Form.patchValue({
        name_ar: this.Data?.country?.name_ar,
        name_en: this.Data?.country?.name_en,
        name_cn: this.Data?.country?.name_cn,
      });
    }
  }
  onSubmit() {
    this.spinner.show();
    if (this.Form.valid) {
      if (this.Data.type == "add") {
        this.service.addCountry(this.Form.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.data.close(res.message);
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
          }
        );
      } else {
        
      }
    }
  }
}

import { Component, Inject, inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CountriesComponent } from "../../components/countries/countries.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from "../../components/countries/countries.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CitiesService } from "src/app/components/cities/cities.service";
@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.scss"],
})
export class PopUpComponent {
  Form: FormGroup;
  Data: any;
  deleteMode: boolean = false;
  constructor(
    private data: MatDialogRef<CountriesComponent>,
    @Inject(MAT_DIALOG_DATA) public AllData: any,
    private fb: FormBuilder,
    private service: CountriesService,
    private spinner: NgxSpinnerService,
    private citiesServ: CitiesService
  ) {
    this.Data = AllData;
  }
  ngOnInit(): void {
    console.log(this.Data.type);

    if (this.Data.type == "delete") {
      this.deleteMode = true;
    }
    this.Form = this.fb.group({
      name_ar: ["", Validators.required],
      name_en: ["", Validators.required],
      name_cn: ["", Validators.required],
      id: [""],
    });
    if (this.Data.type === "edit") {
      this.Form.patchValue({
        name_ar: this.Data?.country?.name_ar,
        name_en: this.Data?.country?.name_en,
        name_cn: this.Data?.country?.name_cn,
        id: this.Data?.country?.id,
      });
    }
  }
  delete() {
    this.spinner.show();
    this.service.deleteCountry(this.Data.id).subscribe(
      (res: any) => {
        this.spinner.hide(), this.data.close(res.message);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
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
      } else if (this.Data.type == "edit") {
        this.service.updateCountry(this.Form.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.data.close(res.message);
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
          }
        );
      } else if (this.Data.type == "add_city") {
        this.Form.patchValue({
          id: this.Data.country_id,
        });
        this.citiesServ.createCity(this.Form.value).subscribe((res: any) => {
          if ((res.status = true)) {
            this.spinner.hide();
            this.data.close("addCity");
          }
        });
      }
    }
  }
  close() {
    this.data.close();
  }
}

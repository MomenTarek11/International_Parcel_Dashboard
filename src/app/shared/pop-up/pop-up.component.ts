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
    console.log(this.Data);

    if (this.Data.type == "delete" || this.Data.type == "delete_city") {
      this.deleteMode = true;
    }
    this.Form = this.fb.group({
      name_ar: ["", Validators.required],
      name_en: ["", Validators.required],
      name_cn: ["", Validators.required],
      country_id: [""],
      city_id: [""],
    });
    if (this.Data.type === "edit") {
      this.Form.patchValue({
        name_ar: this.Data?.country?.name_ar,
        name_en: this.Data?.country?.name_en,
        name_cn: this.Data?.country?.name_cn,
        country_id: this.Data?.country?.id,
      });
    } else if (this.Data.type === "edit_city") {
      this.Form.patchValue({
        name_ar: this.Data?.city?.name_ar,
        name_en: this.Data?.city?.name_en,
        name_cn: this.Data?.city?.name_cn,
        country_id: this.Data?.city?.country_id,
        city_id: this.Data?.city?.id,
      });
    }
  }
  delete() {
    this.spinner.show();
    if (this.Data.type == "delete") {
      this.service.deleteCountry(this.Data.id).subscribe(
        (res: any) => {
          this.spinner.hide(), this.data.close(res.message);
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    } else {
      this.citiesServ.deleteCity(this.Data.id).subscribe((res: any) => {
        this.spinner.hide(), this.data.close(res.message);
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
          country_id: this.Data.country_id,
        });
        this.citiesServ.createCity(this.Form.value).subscribe((res: any) => {
          if ((res.status = true)) {
            this.spinner.hide();
            this.data.close("addCity");
          }
        });
      } else {
        this.citiesServ.updateCity(this.Form.value).subscribe(
          (res: any) => {
            if ((res.status = true)) {
              this.spinner.hide();
              this.data.close("editCity");
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }
  close() {
    this.data.close();
  }
}

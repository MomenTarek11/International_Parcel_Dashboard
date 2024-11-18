import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from "../../countries/countries.service";
import { CitiesService } from "../cities.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-city",
  templateUrl: "./add-city.component.html",
  styleUrls: ["./add-city.component.scss"],
})
export class AddCityComponent implements OnInit {
  Form: FormGroup;
  choosenCountry: any;
  countries: any;
  cities: any;
  constructor(
    private fb: FormBuilder,
    private countriesServ: CountriesService,
    private cityServ: CitiesService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      name_ar: ["", Validators.required],
      name_en: ["", Validators.required],
      name_cn: ["", Validators.required],
      country_id: ["", Validators.required],
    });
    this.getAllCountries();
  }
  getAllCountries() {
    this.countriesServ.getAllCountries().subscribe((res: any) => {
      if (res.status == true) {
        this.countries = res.data;
        if (localStorage.getItem("country") != null) {
          this.choosenCountry = JSON.parse(localStorage.getItem("country"));
        } else {
          this.choosenCountry = this.countries[0];
        }
        this.Form.patchValue({
          country_id: this.choosenCountry?.id,
        });
      }
    });
  }
  onSubmit() {
    if (this.Form.valid) {
      this.cityServ.createCity(this.Form.value).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.toaster.success("تم اضافة المدينة بنجاح");
            this.router.navigate(["/app/cities"]);
            localStorage.setItem(
              "country",
              JSON.stringify(this.choosenCountry)
            );
          }
        },
        (error: any) => {
          this.toaster.error(error.message);
        }
      );
    } else {
      console.log("hamo", this.Form.value);
    }
  }
  chooseCountry(country: any) {
    this.Form.patchValue({ country_id: country.id });
    this.choosenCountry = country;
  }
}

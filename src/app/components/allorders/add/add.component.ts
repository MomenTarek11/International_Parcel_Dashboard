import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
import { CountriesService } from "../../countries/countries.service";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  Form!: FormGroup;
  countries: any[] = [];
  // cities: any[] = [];
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private services: CountriesService) {}
  shipmentTypes: any[] = [];
  types: any[] = [
    { id: 0, name: "جوي" },
    { id: 1, name: "بحرى" },
  ];
  ngOnInit(): void {
    this.Form = this.fb.group({
      user_name: ["", Validators.required],
      user_phone: ["", Validators.required],
      user_country_code: ["", Validators.required],
      source_country_id: ["", Validators.required],
      destination_country_id: ["", Validators.required],
      shipment_type_id: ["", Validators.required],
      type: ["", Validators.required],
      weight: ["", Validators.required],
    });
    this.getCountries();
  }
  onSubmit() {
    console.log(this.Form.value);
  }
  getCountries() {
    this.services.getAllCountries().subscribe((res: any) => {
      this.countries = res?.data;
    });
  }
}

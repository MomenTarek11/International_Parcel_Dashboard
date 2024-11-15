import { Component, OnInit } from "@angular/core";
import { CountriesService } from "../countries/countries.service";
import { CitiesService } from "./cities.service";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.scss"],
})
export class CitiesComponent implements OnInit {
  known: boolean = false;
  cities: any;
  countries: any;
  chossenCountry: any;
  data: any;

  constructor(
    private countryServices: CountriesService,
    private service: CitiesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllcountries();
  }
  getAllcountries() {
    this.countryServices.getAllCountries().subscribe(
      (res: any) => {
        if ((res.status = true)) {
          this.countries = res.data;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAllCities(country: any) {
    this.service.getAllcities(country.id).subscribe(
      (res: any) => {
        if ((res.status = true)) {
          this.known = true;
          this.cities = res.data;
          this.chossenCountry = country;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  addCity() {
    this.data = {
      title: "إضافة مدينة",
      button: "اضافة",
      type: "add_city",
      country_id: this.chossenCountry.id,
    };
    this.openDialog(this.data);
  }
  deleteCity(arg0: any) {
    throw new Error("Method not implemented.");
  }
  editCity(arg0: any, _t27: any) {
    throw new Error("Method not implemented.");
  }
  openDialog(data: any) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Dialog closed:", result);
      if (result === "addCity") {
        this.getAllCities(this.chossenCountry);
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { CountriesService } from "../countries/countries.service";
import { CitiesService } from "./cities.service";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { ToastrService } from "ngx-toastr";

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
  no_data: boolean = false;
  showPlaceholder = false;

  constructor(
    private countryServices: CountriesService,
    private service: CitiesService,
    private dialog: MatDialog,
    private toaster: ToastrService
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
    this.showPlaceholder = true;
    this.service.getAllcities(country.id).subscribe(
      (res: any) => {
        this.showPlaceholder = false;
        if ((res.status = true)) {
          this.known = true;
          this.chossenCountry = country;
          if (res.data.length > 0) {
            this.cities = res.data;
            this.no_data = false;
          } else {
            this.cities = [];
            this.no_data = true;
          }
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
  editCity(city: any) {
    this.data = {
      title: "تعديل المدينة",
      button: "تعديل",
      type: "edit_city",
      city: city,
    };
    this.openDialog(this.data);
  }
  deleteCity(id: number) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذه المدينة ؟",
      button: "حذف",
      type: "delete_city",
      id: id,
    };
    this.openDialog(this.data);
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
      if (result) {
        this.toaster.success(result);
        this.getAllCities(this.chossenCountry);
      }
    });
  }
}

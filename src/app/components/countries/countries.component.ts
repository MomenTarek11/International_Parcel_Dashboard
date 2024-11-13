import { Component, inject, OnInit } from "@angular/core";
import { CountriesService } from "./countries.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "./pop-up/pop-up.component";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
})
export class CountriesComponent implements OnInit {
  countries: any;
  constructor(
    private service: CountriesService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
    this.spinner.show();
    this.service.getAllCountries().subscribe((res: any) => {
      this.spinner.hide();
      this.countries = res.data;
    });
  }
  addCountry() {
    this.openDialog();
  }
  editCountry(id) {
    console.log(id);
  }
  deleteCountry(id) {}
  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Dialog closed:", result);
    });
  }
}

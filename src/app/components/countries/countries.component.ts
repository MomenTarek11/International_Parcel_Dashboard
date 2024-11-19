import { Component, OnInit } from "@angular/core";
import { CountriesService } from "./countries.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../../shared/pop-up/pop-up.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  data: any;
  no_data: boolean = false;

  constructor(
    private service: CountriesService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {
    localStorage.removeItem("country");
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
    this.spinner.show();
    this.service.getAllCountries().subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.data && res.data.length > 0) {
          this.countries = res.data;
          this.no_data = false;
        } else {
          this.countries = [];
          this.no_data = true;
        }
      },
      (error) => {
        this.spinner.hide();
        this.no_data = true;
        this.toaster.error("Failed to load countries.");
      }
    );
  }

  editCountry(id: any, index: number) {
    this.data = {
      title: "تعديل دولة",
      button: "تعديل",
      type: "edit",
      country: this.countries[index],
    };
    this.openDialog(this.data);
  }

  deleteCountry(id: number) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذه الدولة ؟",
      button: "حذف",
      type: "delete",
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
      }
      this.getAllCountries();
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { DetailsComponent } from "../details/details.component";
@Component({
  selector: "app-waiting",
  templateUrl: "./waiting.component.html",
  styleUrls: ["./waiting.component.scss"],
})
export class WaitingComponent implements OnInit {
  orders: any;

  active: number = 0;

  showPlaceholder: boolean = true;

  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.showSpinner();
    this.getWaitingOrders(1, 0, this.active);
  }
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
  getWaitingOrders(page: number, company: number, active: any) {
    this.showPlaceholder = true;
    this.showSpinner();
    this.service
      .getOrderspages(page, company, active, 0, 0, 0, 0)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.hideSpinner();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }
  viewOrder(order: any) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }
}

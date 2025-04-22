import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-to-client",
  templateUrl: "./to-client.component.html",
  styleUrls: ["./to-client.component.scss"],
})
export class ToClientComponent implements OnInit {
  orders: any;
  active = 7;

  company_id: any;
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.ShowFinishedOrders(1, 0, this.active);
  }

  ShowFinishedOrders(page, company, active) {
    this.spinner.show();
    this.service
      .getOrderspages(page, company, active)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }

  viewOrder(order) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }
}

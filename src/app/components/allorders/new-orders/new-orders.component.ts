import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";

@Component({
  selector: "app-new-orders",
  templateUrl: "./new-orders.component.html",
  styleUrls: ["./new-orders.component.scss"],
})
export class NewOrdersComponent implements OnInit {
  orders;
  active = 0;
  companies;
  selectedOption;
  company_id;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.clientList(0, this.active);
  }
  getCompanies() {
    this.service
      .getCompanies()
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.companies = res;
      });
  }
  getCompany(company) {
    this.company_id = company;
    this.clientList(company, this.active);
  }
  clientList(company, active) {

    this.spinner.show();
    this.service
      .getOrders(company, active)
      .pipe(map((res) => res["data"].data))
      .subscribe((res) => {
        this.spinner.hide();
        this.orders = res;
      });
  }

  changeStatus(user_id, status_id) {
    this.spinner.show();
    this.service
      .ChangeOrdersStatus(user_id, status_id)
      .subscribe((res: any) => {
        this.spinner.hide();
      });
  }
  confirmOrder(order_id) {
    this.spinner.show();
    this.service.ConfirmOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(this.company_id, this.active);
    });
  }
  reciveOrder(order_id) {
    this.spinner.show();
    this.service.recieveOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(this.company_id, this.active);
    });
  }
  finishOrder(order_id) {
    this.spinner.show();
    this.service.finishOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(this.company_id, this.active);
    });
  }
  viewOrder(order) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
    });
  }
}

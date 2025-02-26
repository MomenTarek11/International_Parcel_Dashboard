import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ProviderDetailsComponent } from "../../provider/provider-details/provider-details.component";
import { UserDetailsComponent } from "../../users/user-details/user-details.component";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  clients: any;
  active = 1;
  showPlaceholder: boolean = true;
  data: any;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.clientList(this.active, 1);
  }

  clientList(active, page) {
    this.spinner.show();
    this.service
      .getClients(active, page)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.clients = res;
        this.showPlaceholder = false;
      });
  }

  getOrders(progress) {
    this.active = progress;
    this.clientList(progress, 1);
  }
  changeStatus(user_id, status_id) {
    this.spinner.show();

    this.service.changeStatus(user_id, status_id).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      // this.clients=res
    });
    this.clientList(this.active, 1);
  }
  viewClient(client) {
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: client,
      height: "450px",
      width: "600px",
    });
  }
  deleteClient(id: any) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذا العميل  ؟",
      button: "حذف",
      type: "cancel_order",
      id: id,
    };
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
      data: this.data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.service.DeleteTest(id).subscribe((res) => {
        //   this.spinner.hide();
        //   this.toster.success(" تم حذف الرأي بنجاح");
        //   this.clientList(this.active, 1);
        // });
      }
    });
  }
}

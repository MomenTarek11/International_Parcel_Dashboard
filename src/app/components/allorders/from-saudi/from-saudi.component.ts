import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { NotesPopUpComponent } from "src/app/shared/notes-pop-up/notes-pop-up.component";

@Component({
  selector: "app-from-saudi",
  templateUrl: "./from-saudi.component.html",
  styleUrls: ["./from-saudi.component.scss"],
})
export class FromSaudiComponent implements OnInit {
  orders: any;
  active = 6;
  company_id: any;
  showPlaceholder: boolean = true;
  data: any;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.ShowOrdersDeliveredToCustomer(1, 0, this.active);
  }
  ShowOrdersDeliveredToCustomer(page, company, active) {
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


  finishOrder(order_id) {
    this.data = {
      title: "هل انت واثق انك تريد تأكيد هذا الطلب  ؟",
      button: "تأكيد",
      type: "confirm_order",
      id: order_id,
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
        this.service.finishOrder(order_id).subscribe((res: any) => {
          this.spinner.hide();

          this.toaster.success("تم إستلام الطلب بنجاح");
          this.ShowOrdersDeliveredToCustomer(1, this.company_id, this.active);
        });
      }
    });
  }
  viewOrder(order) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }

  cancelOrder(order_id, note) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذا الطلب  ؟",
      button: "حذف",
      type: "cancel_order",
      id: order_id,
      note: note,
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
        this.service.cancelOrder(order_id, note).subscribe((res: any) => {
          this.spinner.hide();

          this.toaster.error("تم إلغاء الطلب بنجاح");
          this.ShowOrdersDeliveredToCustomer(1, this.company_id, this.active);
        });
      }
    });
  }

  addNote(order_id) {
    this.dialog
      .open(NotesPopUpComponent, {
        width: "500px",
        maxWidth: "90vw",
        height: "auto",
        maxHeight: "90vh",
        autoFocus: false,
        data: order_id,
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.toaster.success(result);
          this.ShowOrdersDeliveredToCustomer(1, this.company_id, this.active);
        }
      });
  }
}

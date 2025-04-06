import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { NotesPopUpComponent } from "src/app/shared/notes-pop-up/notes-pop-up.component";
import { ToastrService } from "ngx-toastr";
import { PaymentPopUpComponent } from "./payment-pop-up/payment-pop-up.component";

@Component({
  selector: "app-recieved-china",
  templateUrl: "./recieved-china.component.html",
  styleUrls: ["./recieved-china.component.scss"],
})
export class RecievedChinaComponent implements OnInit {
  orders: any;
  active = 2;
  companies;
  selectedOption;
  company_id;
  showPlaceholder: boolean = true;
  payed: boolean = false;
  data: any;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.ShowOrders(1, 0, this.active);
  }
ShowOrders(page, company, active) {
    this.spinner.show();
    this.service
      .getOrderspages(page, company, active, 0, 0, 0)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }

  acceptOfflineOrder(user_id) {
    this.data = {
      title: "هل انت واثق انك تريد تأكيد هذا الطلب  ؟",
      button: "تأكيد",
      type: "confirm_order",
      id: user_id,
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
        this.service
          .UpdatePayment({ order_id: user_id, isChanged: 0, price: 0 })
          .subscribe((res: any) => {
            this.spinner.hide();
            this.toaster.success("تم التحديث بنجاح");
            this.ShowOrders(1, this.company_id, this.active);
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

          this.ShowOrders(1, this.company_id, this.active);
        });
        // this.service.finishOrder(order_id).subscribe();
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
          this.ShowOrders(1, this.company_id, this.active);
        }
      });
  }
  changePayment(id: any) {
    this.dialog
      .open(PaymentPopUpComponent, {
        width: "400px",
        height: "auto",
        maxWidth: "90vw",
        maxHeight: "90vh",
        autoFocus: false,
        data: id,
      })
      .afterClosed()
      .subscribe((result: any) => {
        console.log(result);
        if (result) {
          this.toaster.success(result);
          this.ShowOrders(1, this.company_id, this.active);
        }
      });
  }
}

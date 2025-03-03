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
  selector: "app-in-saudi",
  templateUrl: "./in-saudi.component.html",
  styleUrls: ["./in-saudi.component.scss"],
})
export class InSaudiComponent implements OnInit {
  orders: any;
  active = 5;
  companies: any;
  selectedOption: any;
  company_id: any;
  showPlaceholder: boolean = true;
  data: { title: string; button: string; type: string; id: any; note: any };
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.clientList(1, 0, this.active);
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
    this.clientList(1, company, this.active);
  }
  clientList(page, company, active) {

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

  
  confirmOrder(order_id) {
    this.spinner.show();
    this.service.ConfirmOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(1, this.company_id, this.active);
    });
  }
  reciveOrder(order_id) {
    this.spinner.show();
    this.service.recieveOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(1, this.company_id, this.active);
    });
  }
  finishOrder(order_id) {
    this.spinner.show();
    this.service.finishOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();

      this.clientList(1, this.company_id, this.active);
    });
  }
  viewOrder(order) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }

  changeStatus(user_id, status_id = 6, note) {
    this.data = {
      title: "هل انت واثق انك تريد تأكيد هذا الطلب  ؟",
      button: "تأكيد",
      type: "confirm_order",
      id: user_id,
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
        this.service
          .ChangeOrdersStatus(user_id, status_id, note)
          .subscribe((res: any) => {
            this.spinner.hide();
            this.toaster.success(
              "تم قبول الطلب بنجاح وهو فى الشحنات الجارى توصيلها الى العميل"
            );
            this.clientList(1, this.company_id, this.active);
          });
      }
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

          this.toaster.error("تم الغاء الطلب");
          this.clientList(1, this.company_id, this.active);
        });
        this.service.finishOrder(order_id).subscribe( );
        this.clientList(1, this.company_id, this.active);
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
          this.clientList(1, this.company_id, this.active);
        }
      });
  }
}

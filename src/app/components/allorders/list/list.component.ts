import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { DetailsComponent } from "../details/details.component";
import { ToastrService } from "ngx-toastr";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { NotesPopUpComponent } from "src/app/shared/notes-pop-up/notes-pop-up.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  orders: any;
  active = 0;
  companies: any;
  selectedOption: any;
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
    this.spinner.show();
    this.showPaidOrders(1, 0, this.active);
  }
  // getCompanies() {
  //   this.service
  //     .getCompanies()
  //     .pipe(map((res) => res["data"]))
  //     .subscribe((res) => {
  //       this.spinner.hide();
  //       this.companies = res;
  //     });
  // }

  // getCompany(company) {
  //   this.company_id = company;
  //   this.showPaidOrders(1, company, this.active);
  // }

  showPaidOrders(page: number, company: any, active: any) {
    this.showPlaceholder = true;
    this.spinner.show();
    this.service
      .getOrderspages(page, company, active, 0, 0, 0, 1)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }

  confirmOrder(order_id: any) {
    this.data = {
      title: "هل انت واثق انك تريد تأكيد هذا الطلب  ؟",
      button: "تأكيد",
      type: "confirm_order",
      id: order_id,
      // note: note,
    };
    this.openDialog(this.data);
  }
  cancelOrder(order_id: any) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذا الطلب  ؟",
      button: "حذف",
      type: "cancel_order",
      id: order_id,
    };
    this.openDialog(this.data);
  }
  viewOrder(order: any) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }
  addNote(order_id: any) {
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
          this.showPaidOrders(1, this.company_id, this.active);
        }
      });
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
        this.showPaidOrders(1, this.company_id, this.active);
      }
    });
  }
}

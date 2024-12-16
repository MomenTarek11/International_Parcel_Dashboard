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

@Component({
  selector: "app-confirmed-orders",
  templateUrl: "./confirmed-orders.component.html",
  styleUrls: ["./confirmed-orders.component.scss"],
})
export class ConfirmedOrdersComponent implements OnInit {
  orders: any;
  active = 1;
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
    console.log(this.orders);
    // this.getCompanies();
    this.clientList(1, 0, this.active);
  }

  getCompany(company) {
    this.company_id = company;
    console.log(company);
    this.clientList(1, company, this.active);
  }
  clientList(page, company, active) {
    console.log("company_id", company);
    console.log("status", active);
    this.spinner.show();
    this.service
      .getOrderspages(page, company, active)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log("dsafasd", res);
        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
        console.log("orders", this.orders);
      });
  }

  // changeStatus(user_id, status_id) {
  //   this.spinner.show();
  //   this.service
  //     .ChangeOrdersStatus(user_id, status_id)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.spinner.hide();
  //     });
  // }
  reciveOrder(order_id, note) {
    this.data = {
      title: "هل انت واثق انك تريد تأكيد هذا الطلب  ؟",
      button: "تأكيد",
      type: "confirm_order",
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
        this.service.recieveOrder(order_id, note).subscribe((res: any) => {
          this.spinner.hide();
          this.toaster.success(
            "تم استلام الطلب بنجاح وهو فى خانة شحنات تحت المراجعة"
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

    this.openDialog(this.data);
  }

  finishOrder(order_id) {
    this.spinner.show();
    this.service.finishOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();
    });
  }
  viewOrder(order) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: order,
      height: "450px",
      width: "600px",
    });
  }

  addNote(order_id) {
    Swal.fire({
      title: "اكتب الملاحظات",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        class: "dir-ltr",
        dir: "auto",
      },
      // showCancelButton: true,
      returnInputValueOnDeny: true,

      confirmButtonText: "قبول",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "رفض",
      cancelButtonText: "الغاء",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        this.reciveOrder(order_id, text);
      },
      preDeny(value) {
        // console.log(value.value , '2333333');
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم القبول بنجاح", "", "success");
      } else if (result.isDenied) {
        this.cancelOrder(order_id, result.value);

        Swal.fire("تم الرفض ", "", "info");
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

        this.clientList(1, this.company_id, this.active);
      }
    });
  }
}

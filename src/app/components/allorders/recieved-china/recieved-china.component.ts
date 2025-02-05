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
    console.log(this.company_id);
    this.getCompanies();
    this.clientList(1, 0, this.active);
  }
  getCompanies() {
    this.service
      .getCompanies()
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.companies = res;
      });
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
      .getOrderspages(page, company, active, 0, 0, 0)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }

  changeStatus(user_id, status_id = 3, note) {
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
            console.log(res);
            this.spinner.hide();
          });
      }
    });
  }

  reciveOrder(order_id, note) {
    this.spinner.show();
    this.service.recieveOrder(order_id, note).subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
      this.clientList(1, this.company_id, this.active);
    });
  }

  finishOrder(order_id) {
    this.spinner.show();
    this.service.finishOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
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
          console.log(res);
          this.clientList(1, this.company_id, this.active);
        });
        this.service.finishOrder(order_id).subscribe((e) => console.log(e));
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

  async changePayment(order_id) {
    Swal.fire({
      title: "اكتب المبلغ",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        class: "dir-ltr",
        dir: "auto",
      },
      // showCancelButton: true,
      confirmButtonText: "اضافة",
      showCancelButton: true,
      cancelButtonText: "الغاء",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        this.spinner.show();
        this.service.changePayment(order_id, 1, text).subscribe((res: any) => {
          this.spinner.hide();
          console.log(res);
          this.clientList(1, this.company_id, this.active);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم القبول بنجاح", "", "success");
        this.clientList(1, this.company_id, this.active);
      }
    });

    await Swal.fire({
      title: "اكتب المبلغ و التعليق",
      html:
        '<input id="swal-input1" placeholder="اكتب المبلغ هنا" class="swal2-input">' +
        '<input id="swal-input2" placeholder="اكتب التعليق " class="swal2-input">',
      focusConfirm: false,
      confirmButtonText: "اضافة",
      showCancelButton: true,
      cancelButtonText: "الغاء",
      preConfirm: () => {
        console.log(document.getElementById("swal-input1"));
        let priceElement = document.getElementById(
          "swal-input1"
        ) as HTMLInputElement;
        let noteElement = document.getElementById(
          "swal-input2"
        ) as HTMLInputElement;

        let price = priceElement?.value;
        let note = noteElement?.value;
        this.spinner.show();
        this.service
          .changePayment(order_id, 1, price, note)
          .subscribe((res: any) => {
            this.spinner.hide();
            console.log(res);
            this.clientList(1, this.company_id, this.active);
          });
        this.service.finishOrder(order_id).subscribe((e) => console.log(e));
        console.log(price, note, "jhuyfdjtfjk");
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم القبول بنجاح", "", "success");
        this.clientList(1, this.company_id, this.active);
      }
    });
  }
}

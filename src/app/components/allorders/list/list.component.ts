import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

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
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
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
    this.showPlaceholder = true;
    this.spinner.show();
    this.service
      .getOrderspages(page, company, active)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);

        this.spinner.hide();
        this.orders = res;
        this.showPlaceholder = false;
      });
  }

  confirmOrder(order_id, note) {
    this.spinner.show();

    this.service.ConfirmOrder(order_id, note).subscribe((res: any) => {
      this.spinner.hide();
      this.toaster.success(
        "تم تاكيد الطلب بنجاح والان هو في خانة جاري التواصل مع المورد"
      );
      this.clientList(1, this.company_id, this.active);
    });
  }
  cancelOrder(order_id, note) {
    this.spinner.show();
    this.service.cancelOrder(order_id, note).subscribe((res: any) => {
      this.spinner.hide();
      this.toaster.error("تم إلغاء الطلب");
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

  addNote(order_id) {
    Swal.fire({
      title: "اكتب الملاحظات",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
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
        this.confirmOrder(order_id, text);
      },
      preDeny(value) {},
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
}

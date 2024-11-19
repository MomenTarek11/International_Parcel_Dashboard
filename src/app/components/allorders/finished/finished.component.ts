import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-finished",
  templateUrl: "./finished.component.html",
  styleUrls: ["./finished.component.scss"],
})
export class FinishedComponent implements OnInit {
  orders: any[] = [];
  active = 10;
  companies;
  selectedOption;
  company_id;
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService
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
      .getOrderspages(page, company, active)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.orders = res?.data;
        this.showPlaceholder=false
      });
  }

  // clientList(company,active,page){

  //   console.log('page',page)

  //   this.spinner.show()
  //   //   var url :any = new URL(`${environment.endpoint}/backend/orders?company_id=1&status_id=${object.status}&is_changed=${object.changed}&accept_change=${object.accept}&canceled=${object.canceled}`);
  //   var object = {
  //     company_id : company,
  //     status_id : active,
  //     is_changed : 0,
  //     accept_change : 0,
  //     canceled : 1,
  //     page : page

  //   }

  //   console.log(object , "test");

  //   this.service.getOrdersPagination(object).pipe(map(res=>res['data'])).subscribe(res=>{
  //     console.log(res, "kjiuyfrjyghiluh")
  //     this.spinner.hide()
  //     this.orders=res
  //   })
  // }

  changeStatus(user_id, status_id) {
    this.spinner.show();
    this.service
      .ChangeOrdersStatus(user_id, status_id)
      .subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
      });
  }
  confirmOrder(order_id) {
    this.spinner.show();
    this.service.ConfirmOrder(order_id).subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
      this.clientList(1, this.company_id, this.active);
    });
  }

  reciveOrder(order_id) {
    this.spinner.show();
    this.service.recieveOrder(order_id).subscribe((res: any) => {
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
        // this.confirmOrder(order_id,text)
      },
      preDeny(value) {
        // console.log(value.value , '2333333');
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم القبول بنجاح", "", "success");
      } else if (result.isDenied) {
        // this.cancelOrder(order_id,result.value)

        Swal.fire("تم الرفض ", "", "info");
      }
    });
  }
}

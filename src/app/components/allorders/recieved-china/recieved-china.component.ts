import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { environment } from "src/environments/environment";
import { DetailsComponent } from "../details/details.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-recieved-china",
  templateUrl: "./recieved-china.component.html",
  styleUrls: ["./recieved-china.component.scss"],
})
export class RecievedChinaComponent implements OnInit {
  orders: any[] = [];
  active = 2;
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
      .getOrderspages(page, company, active, 0, 0, 0)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.orders = res?.data;
        this.showPlaceholder = false;
      });
  }

  // cancelOrder(order_id,note){

  //   this.spinner.show()
  //   this.service.cancelOrder(order_id,note).subscribe((res:any)=>{
  //     this.spinner.hide()
  //     console.log(res)
  //     this.clientList(1,this.company_id,this.active)
  //   })
  //   this.service.finishOrder(order_id).subscribe(e=>console.log(e))
  // }

  changeStatus(user_id, status_id = 3, note) {
    this.spinner.show();
    this.service
      .ChangeOrdersStatus(user_id, status_id, note)
      .subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
      });
  }

  // confirmOrder(order_id){
  //   this.spinner.show()
  //   this.service.ConfirmOrder(order_id).subscribe((res:any)=>{
  //     this.spinner.hide()
  //     console.log(res)
  //     this.clientList(1,this.company_id,this.active)

  //   })
  // }

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
    this.spinner.show();
    this.service.cancelOrder(order_id, note).subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
      this.clientList(1, this.company_id, this.active);
    });
    this.service.finishOrder(order_id).subscribe((e) => console.log(e));
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
        this.changeStatus(order_id, 3, text);
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
        console.log(result.value);

        Swal.fire("تم الرفض ", "", "info");
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
        this.service.finishOrder(order_id).subscribe((e) => console.log(e));
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

        // console.log(price , note);
      },
      // allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم القبول بنجاح", "", "success");
        this.clientList(1, this.company_id, this.active);
      }
    });

    // if (formValues) {
    //   Swal.fire(JSON.stringify(formValues))
    // }
  }
}

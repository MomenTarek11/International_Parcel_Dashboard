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
  selector: "app-from-china",
  templateUrl: "./from-china.component.html",
  styleUrls: ["./from-china.component.scss"],
})
export class FromChinaComponent implements OnInit {
  orders: any;
  active = 3;
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
    this.ShowOrdersThatGetFromChina(1, 0, this.active);
  }
  ShowOrdersThatGetFromChina(page, company, active) {

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
        this.service.cancelOrder(order_id, note).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.toaster.error("تم الغاء الطلب");
            this.ShowOrdersThatGetFromChina(1, this.company_id, this.active);
          },
          (err: any) => {
            this.spinner.hide();
            this.toaster.error(err.error.message);
          }
        );
      }
    });
  }
  changeStatus(user_id, status_id = 4, note) {
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
        this.service.ChangeOrdersStatus(user_id, status_id, note).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.toaster.success(
              "اصبح الطلب الان فى الشحنات التى فى ميناء المملكة تحت المراجعة الجمركية"
            );
            this.ShowOrdersThatGetFromChina(1, this.company_id, this.active);
          },
          (err: any) => {
            this.spinner.hide();
            this.toaster.error(err.error.message);
          }
        );
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
          this.ShowOrdersThatGetFromChina(1, this.company_id, this.active);
        }
      });
  }
}

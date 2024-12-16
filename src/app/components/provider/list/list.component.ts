import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";
import { ProviderDetailsComponent } from "../provider-details/provider-details.component";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  testmoinals: any;
  showPlaceholder: boolean = true;
  data: { title: string; button: string; type: string; id: any };
  constructor(
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: GlobalService,
    private dialog: MatDialog,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTestmonials();
  }
  getTestmonials() {
    this.spinner.show();
    this.service
      .getTestmonials()
      .pipe(map((res) => res["data"]))
      .subscribe((response: any) => {
        console.log(response);
        this.testmoinals = response;
        this.showPlaceholder = false;
        this.spinner.hide();
      });
  }

  editTest(user) {
    let dialogRef = this.dialog.open(ProviderDetailsComponent, {
      data: user,
      height: "450px",
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTestmonials();
    });
  }
  deleteTest(id: any) {
    this.data = {
      title: "هل انت واثق انك تريد حذف هذا الرأي  ؟",
      button: "حذف",
      type: "cancel_order",
      id: id,
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
        this.service.DeleteTest(id).subscribe((res) => {
          this.spinner.hide();
          this.toster.success(" تم حذف الرأي بنجاح");
          this.getTestmonials();
        });
      }
    });
  }

  addToHome(id: any) {
    // form:FormGroup;
    this.spinner.show();

    let changeStatus = {
      rating_id: id.id,
      in_home: id.in_home == 0 ? 1 : 0,
    };

    this.service.addToTestmonials(changeStatus).subscribe((res) => {
      this.spinner.hide();
      if (id.in_home == 1) {
        Swal.fire("نجاح", "تمت الإزالة بنجاح", "success");
      } else {
        Swal.fire("نجاح", "تمت الإضافة بنجاح", "success");
      }
      this.getTestmonials();
    });
    this.getTestmonials();
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";
import { ProviderDetailsComponent } from "../provider-details/provider-details.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  testmoinals: any[] = [];
  showPlaceholder: boolean = true;
  constructor(
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTestmonials(1);
  }
  getTestmonials(page) {
    this.spinner.show();
    this.service
      .getTestmonials(page)
      .pipe(map((res) => res["data"]))
      .subscribe((response: any) => {
        console.log(response);
        this.testmoinals = response?.data;
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
      this.getTestmonials(1);
    });
  }
  deleteTest(id) {
    this.spinner.show();

    this.service.DeleteTest(id).subscribe((res) => {
      this.spinner.hide();
      Swal.fire("نجااااح", "تم الحذف  بنجاح", "success");
    });
    this.getTestmonials(1);
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
      this.getTestmonials(1);
    });
    this.getTestmonials(1);
  }
}

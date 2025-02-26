import { GlobalService } from "./../../../services/global.service";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { EditComponent } from "../edit/edit.component";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  admins: any[] = [];
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.allAdmins();
  }

  allAdmins() {
    this.spinner.show();
    this.globalService
      .allAdmins()
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.admins = res;
        this.showPlaceholder = false;
        console.log(res);
      });
  }

  editAdmin(admin) {
    let dialogRef = this.dialog
      .open(EditComponent, {
        data: admin,
        height: "600px",
        width: "600px",
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.allAdmins();
      });
  }

  deleteAdmin(admin_id) {
    let dialogRef = this.dialog.open(PopUpComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
      data: {
        title: "هل انت واثق انك تريد حذف هذا المشرف ؟",
        button: "حذف",
        type: "delete_admin",
        id: admin_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toaster.success(result);
      }
      this.allAdmins();
    });
  }
}

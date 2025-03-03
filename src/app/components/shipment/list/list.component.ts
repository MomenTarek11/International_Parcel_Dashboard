import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { EditComponent } from "../edit/edit.component";
import { environment } from "src/environments/environment";
import { EditSubcategoryComponent } from "../../subcategories/edit-subcategory/edit-subcategory.component";
import { GlobalService } from "src/app/services/global.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  banners: any[] = [];
  baseUrl = environment.baseURL;
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.bannersList();
  }

  bannersList() {
    this.spinner.show();
    this.service
      .getAllShipmentTypes()
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();

        this.banners = res;
        this.showPlaceholder = false;
      });
  }
  deleteApp(type_id) {
    this.spinner.show();
    this.service.deleteShippment(type_id).subscribe((res) => {
      this.spinner.hide();
      this.toaster.success("تم الحذف بنجاح");
      this.bannersList();
    });
  }
  editPackage(category) {
    let dialogRef = this.dialog.open(EditComponent, {
      data: category,
      height: "650px",
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.bannersList();
    });
  }
}

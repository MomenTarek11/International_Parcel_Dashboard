import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { EditSubcategoryComponent } from "../../subcategories/edit-subcategory/edit-subcategory.component";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  messages: any[] = [];
  baseUrl = environment.baseURL;
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getMessages(1);
  }

  getMessages(page) {
    this.spinner.show();
    this.service
      .getmessages(page)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.messages = res?.data;
        this.showPlaceholder = false;
      });
  }
  deleteApp(type_id) {
    this.spinner.show();
    this.service.deleteShippment(type_id).subscribe((res) => {
      this.spinner.hide();
      Swal.fire("نجاح", "تم الحذف  بنجاح", "success");
      this.getMessages(1);
    });
  }
 
}

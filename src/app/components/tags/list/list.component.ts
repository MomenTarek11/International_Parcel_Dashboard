import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";
import { EditComponent } from "../edit/edit.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  shippment: any;
  showPlaceholder: boolean = true;
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.allTransactions(1);
  }

  allTransactions(page) {
    this.spinner.show();
    this.globalService
      .getTransactions(page)
      .pipe(map((res) => res["data"]))
      .subscribe((res) => {
        this.spinner.hide();
        this.shippment = res;
        this.showPlaceholder = false;
      });
  }
}

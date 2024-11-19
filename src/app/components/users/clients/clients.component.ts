import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
  public selectedRole = this.route.snapshot.paramMap.get("role");
  promocodes: any[] = [];
  showPlaceholder: boolean = true;
  constructor(
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPromoCodes();
  }
  getPromoCodes() {
    this.spinner.show();
    this.service
      .getPromoCode()
      .pipe(map((res) => res["data"]))
      .subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.promocodes = response;
        this.showPlaceholder = false;
      });
  }
  deletePromo(id) {
    this.spinner.show();
    this.service.deletePromo(id).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        Swal.fire("نجاح", "تم التعديل بنجاح", "success");
      } else {
        Swal.fire("نجاح", response["errors"][0], "success");
      }
      this.getPromoCodes();
    });
  }
  viewUser(user) {
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data: user,
      height: "550px",
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getPromoCodes();
    });
  }
}

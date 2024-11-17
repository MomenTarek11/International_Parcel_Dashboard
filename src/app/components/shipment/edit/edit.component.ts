import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  image_edit = false;
  constructor(
    private formbuilder: FormBuilder,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.formbuilder.group({
      shipment_type_id: [this.data.id, Validators.required],
      name_ar: [this.data.name_ar, Validators.required],
      name_en: [this.data.name_en, Validators.required],
      name_cn: [this.data.name_cn, Validators.required],
      plan_price: [this.data.plan_price, Validators.required],
      ship_price: [this.data.ship_price, Validators.required],
    });
    console.log("this.data");
    console.log(this.data);
  }

  // onSelect(event) {
  //   console.log(event.addedFiles[0]);
  //   this.files=[]
  //   this.files.push(...event.addedFiles);
  // }

  // onRemove(event) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }

  submit() {
    this.spinner.show();

    this.service.editShipmentType(this.form.value).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.status == true) {
          this.toaster.success("تم التعديل بنجاح");
        } else {
          this.toaster.error(res.message);
        }
        this.dialog.closeAll();
      },
      (err: any) => {
        this.spinner.hide();
        console.log(err);
        this.toaster.error(err.error.message);
      }
    );
  }
}

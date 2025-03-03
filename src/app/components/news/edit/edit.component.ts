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
    this.form = this.formbuilder.group({
      news_id: [this.data.id, Validators.required],
      title_ar: [this.data.title_ar, Validators.required],
      title_en: [this.data.title_en, Validators.required],
      title_cn: [this.data.title_cn, Validators.required],
    });
  }
  submit() {
    this.spinner.show();

    this.service.updateNews(this.form.value).subscribe((res: any) => {
      this.spinner.hide();
      if (res.status == true) {
        this.toaster.success("تم تعديل الخبر بنجاح");
      } else {
        this.toaster.error(res["errors"][0]);
      }
      this.dialog.closeAll();
    });
  }
}

import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
// import { ToastrService } from "ngx-toastr";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup;
  image_edit = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  permissions = [];
  show = false;
  uploadedImage: any;

  AllPermitions: any = [
    { section_id: 1, section_name: "إضافة طلب" },
    { section_id: 2, section_name: "طلبات لم تدفع بعد" },
    { section_id: 3, section_name: "طلبات جديدة" },
    { section_id: 4, section_name: "جاري التواصل مع المورد" },
    { section_id: 5, section_name: "شحنات تحت المراجعة" },
    { section_id: 6, section_name: "الطلبات المعلقة" },
    { section_id: 7, section_name: "طلبات جاري شحنها من الصين" },
    {
      section_id: 8,
      section_name: "شحنات في ميناء المملكة تحت المراجعة الجمركية",
    },
    { section_id: 9, section_name: "شحنات جاري تفريغها في مستودعاتنا" },
    { section_id: 10, section_name: "شحنات جاري توصيلها للعميل" },
    { section_id: 11, section_name: "شحنات منتهية" },
    { section_id: 12, section_name: "شحنات ملغية" },
    { section_id: 13, section_name: "آراء العملاء" },
    { section_id: 14, section_name: "البانرات" },
    { section_id: 15, section_name: "المسؤولين" },
    { section_id: 16, section_name: "أنواع الشحنات" },
    { section_id: 17, section_name: "العملاء" },
    { section_id: 18, section_name: "البروموكود" },
    { section_id: 19, section_name: "التحويلات" },
    { section_id: 20, section_name: "شريط الأخبار" },
    { section_id: 21, section_name: "رسائل العملاء" },
    { section_id: 22, section_name: "الدول" },
    { section_id: 23, section_name: "المدن" },
    { section_id: 24, section_name: "المقالات" },
  ];
  constructor(
    private formbuilder: FormBuilder,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: [this.data?.name, Validators.required],
      email: [this.data?.email, Validators.required],
      image: [this.data?.image],
      permissions: [[]],
    });
    this.uploadedImage = this.data?.imagePath;
  }
  get f() {
    return this.form.controls;
  }
  files: File[] = [];

  onSelectAll() {
    const selected = this.AllPermitions.map((item) => item.section_id);
    this.form.get("permissions").patchValue(selected);
  }
  onClearAll() {
    this.form.get("permissions").patchValue([]);
  }
  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.spinner.show();

    this.service.editAdmin(this.form.value, this.data.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.status == true) {
          this.toastr.success("تم تعديل المسؤول بنجاح");
        } else {
          for (let i = 0; i < res.errors.length; i++) {
            this.toastr.error(res.errors[i]);
          }
        }
        this.dialog.closeAll();
      },
      (error: any) => {
        this.toastr.error("يوجد مشكلة فى التعديل");
      }
    );
  }
  UploadImage(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

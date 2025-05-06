import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
// import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  submitted: boolean = false;
  notEqual: boolean = false;
  form: FormGroup;
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

  uploadedImage: any;
  constructor(
    private fb: FormBuilder,
    private service: GlobalService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required],
      image: [null, Validators.required],
      permissions: [null, Validators.required],
    });
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      if (this.form.value.password != this.form.value.password_confirmation) {
        this.notEqual = true;
        return;
      } else {
        this.spinner.show();
        this.service.addAdmin(this.form.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            if (res.status == false) {
              for (let i = 0; i < res.errors.length; i++) {
                this.toaster.error(res.errors[i]);
              }
            } else {
              this.toaster.success("تم اضافة الادمن بنجاح");
              this.router.navigate(["/app/admins/list"]);
            }
          },
          (err: any) => {
            this.spinner.hide();
            this.toaster.error("حدث خطأ");
          }
        );
      }
    }
  }
  get f() {
    return this.form.controls;
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
  onSelectAll() {
    const selected = this.AllPermitions.map((item) => item.section_id);
    this.form.get("permissions").patchValue(selected);
  }
  onClearAll() {
    this.form.get("permissions").patchValue([]);
  }
}

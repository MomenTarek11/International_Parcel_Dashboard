import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
// import { ToastrService } from "ngx-toastr";
import { GlobalService } from "src/app/services/global.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  image_edit = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  permissions = [];
  show = false;
  constructor(
    private formbuilder: FormBuilder,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.formbuilder.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, Validators.required],
      password: ["", Validators.required],
      role: [this.data.role, Validators.required],
    });
    this.dropdownList = [
      { section_id: 10, section_name: "الطلبات" },
      { section_id: 11, section_name: "الطلبات-طلبات جديدة" },
      { section_id: 12, section_name: "الطلبات-جاري التواصل مع المورد" },
      { section_id: 13, section_name: "الطلبات-شحنات تحت المراجعة" },
      { section_id: 14, section_name: "الطلبات-الطلبات المعلقة" },
      { section_id: 15, section_name: "الطلبات-جاري شحنها من الصين" },
      {
        section_id: 16,
        section_name: "الطلبات-شحنات في ميناء المملكة تحت المراجعة الجمركية",
      },
      {
        section_id: 17,
        section_name: "الطلبات-شحنات جاري تفريغها في مستودعاتنا",
      },
      { section_id: 18, section_name: "الطلبات-شحنات جاري توصيلها للعميل" },
      { section_id: 19, section_name: "الطلبات-شحنات منتهية" },
      { section_id: 20, section_name: "الطلبات-شحنات ملغية" },

      { section_id: 1, section_name: "اراء العملاء" },
      { section_id: 2, section_name: "البانرات" },
      { section_id: 3, section_name: "الادمن" },
      { section_id: 4, section_name: "انواع الشحنات" },
      { section_id: 5, section_name: "العملاء" },
      { section_id: 6, section_name: "البروموكود" },
      { section_id: 7, section_name: "التحويلات" },
      { section_id: 8, section_name: "شريط الأخبار" },
      { section_id: 9, section_name: "رسائل العملاء" },
    ];
    this.selectedItems = [];
    for (let i = 0; i < this.dropdownList.length; i++) {
      for (let y = 0; y < this.data?.sections.length; y++) {
        if (this.dropdownList[i]?.section_name == this.data?.sections[y]) {
          this.selectedItems.push(this.dropdownList[i]);
        }
      }
      console.log(
        this.dropdownList[1].section_name,
        this.data?.sections[i],
        "just for test"
      );
    }
    this.permissions = this.selectedItems;
    this.dropdownSettings = {
      singleSelection: false,
      idField: "section_id",
      textField: "section_name",
      selectAllText: " اختيار الكل",
      unSelectAllText: " الغاء الاختيار",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    console.log("this.data");
    console.log(this.data);
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files = [];
    this.files.push(...event.addedFiles);
  }
  onItemSelect(item: any) {
    console.log(this.permissions);

    this.permissions.push(item);

    console.log(item);
  }

  itemDeselect(item: any) {
    this.permissions.splice(this.permissions.indexOf(item), 1);
    console.log("removed");
    return;
  }

  onSelectAll(items: any) {
    console.log(items);
    this.permissions = items;
    if (this.permissions.length > 0) {
      this.permissions = [];
    }
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit() {
    console.log("Form Work");
    this.spinner.show();
    let form = {
      ...this.form.value,
      image: this.files[0],
      admin_id: this.data.id,
      sections: [...new Set(this.permissions)],
    };
    console.log("submitting the form", form);
    this.service.editAdmin(form).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
      if (res.status == true) {
        Swal.fire("نجاح", "تم تعديل الادمن بنجاح", "success");
      } else {
        for (let i = 0; i < res.errors.length; i++) {
          // this.toastr.error(res.errors[i]);
        }
      }
      this.dialog.closeAll();
    });
  }
}

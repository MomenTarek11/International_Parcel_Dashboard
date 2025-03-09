import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
import { CountriesService } from "../../countries/countries.service";
import { GlobalService } from "src/app/services/global.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ShowPhotoComponent } from "./show-photo/show-photo.component";
import { Router } from "@angular/router";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  commercialInvoice: File[] = [];
  commercialInvoicelength: any = [];
  packingListlength: any = [];
  packingList: File[] = [];
  imagePath: any[] = [];
  imagePath2: any[] = [];
  commercialInvoiceArr!: any[];
  packingListArr!: any[];
  clicked: Boolean = false;
  files: File[] = [];
  thisLang: any;
  showComercialInvoice = true;
  showPackingList = true;
  fullComercialInvoice = false;
  fullPackingList = false;
  Form!: FormGroup;
  countries: any[] = [];
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private services: CountriesService,
    private globalServices: GlobalService,
    private toaster: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  shipmentTypes: any[] = [];
  types: any[] = [
    { id: 0, name: "بحرى" },
    { id: 1, name: "جوى" },
  ];
  ngOnInit(): void {
    this.Form = this.fb.group({
      user_name: ["", Validators.required],
      user_phone: ["", Validators.required],
      user_country_code: ["", Validators.required],
      source_country_id: ["", Validators.required],
      destination_country_id: ["", Validators.required],
      shipment_type_id: ["", Validators.required],
      type: ["", Validators.required],
      weight: ["", Validators.required],
    });
    this.getCountries();
    this.getAllShipmentTypes();
  }
  getCountries() {
    this.services.getAllCountries().subscribe((res: any) => {
      this.countries = res?.data;
    });
  }
  getAllShipmentTypes() {
    this.globalServices.getAllShipmentTypes().subscribe((res: any) => {
      this.shipmentTypes = res?.data;
    });
  }
  commercialInvoiceChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (
      !(inputElement instanceof HTMLInputElement) ||
      inputElement.type !== "file"
    ) {
      console.error("Invalid input element:", inputElement);
      return;
    }

    const files = inputElement.files;
    if (!files || files.length === 0) {
      console.warn("No file selected.");
      return;
    }

    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.toaster.warning("الملف يجب ان يكون اقل من 2 ميجا");
      inputElement.value = ""; // Safely reset value to empty
      return;
    }
    const dialogRef = this.dialog.open(ShowPhotoComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
      data: { file },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.commercialInvoice.push(file);
        this.showComercialInvoice = false;
        this.imagePath.push(result);
      }
      inputElement.value = "";
    });
  }

  packingListChange(event: any) {
    const inputElement = event.target as HTMLInputElement;

    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      this.toaster.warning("الملف يجب ان يكون اقل من 2 ميجا");
      inputElement.value = "";
      return;
    }
    const dialogRef = this.dialog.open(ShowPhotoComponent, {
      width: "500px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      autoFocus: false,
      data: { file },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.packingList.push(file);
        this.showComercialInvoice = false;
        this.imagePath2.push(result);
      }
      inputElement.value = "";
    });
  }
  packingListremove(event: any, index: number) {
    this.packingList.splice(this.files.indexOf(event), 1);
    this.imagePath2.splice(index, 1);
    this.showPackingList = true;
  }
  commercialInvoiceRemove(event: any, index: number) {
    this.commercialInvoice.splice(this.files.indexOf(event), 1);
    this.imagePath.splice(index, 1);
    this.showComercialInvoice = true;
  }

  onSubmit() {
    this.submitted = true;

    // Ensure user_phone exists before modifying
    const userPhone = this.Form.controls.user_phone.value?.number || "";
    const userCountryCode = this.Form.controls.user_phone.value?.dialCode || "";

    this.Form.patchValue({
      user_phone: userPhone.replace(/[^0-9]/g, "").slice(1), // Remove first digit
      user_country_code: userCountryCode.replace("+", ""),
    });

    // Ensure form values are updated
    this.Form.updateValueAndValidity();

    console.log("Form Status:", this.Form.status); // Should be "VALID" if correct
    console.log("Form Errors:", this.Form.errors); // Should be null if valid
    console.log("Form Controls:", this.Form.controls); // Check individual controls

    let form = {
      ...this.Form.value,
      invoice: this.commercialInvoice,
      list: this.packingList,
    };

    setTimeout(() => {
      console.log("Final Form Status:", this.Form.status); // Check again after delay
      if (this.Form.valid) {
        this.spinner.show();
        this.globalServices.createOrder(form).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.toaster.success("تم اضافة الطلب بنجاح");
            this.router.navigate(["app/orders/recievedChina"]);
          },
          (err) => {
            this.spinner.hide();
            this.toaster.error("حدث خطأ ما");
          }
        );
      } else {
        console.log("❌ Form is still invalid!", form);
      }
    }, 100); // Small delay to allow form revalidation
  }
}

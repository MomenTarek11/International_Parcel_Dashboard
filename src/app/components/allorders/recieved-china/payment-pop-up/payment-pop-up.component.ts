import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GlobalService } from "src/app/services/global.service";
import { NotesPopUpComponent } from "src/app/shared/notes-pop-up/notes-pop-up.component";

@Component({
  selector: "app-payment-pop-up",
  templateUrl: "./payment-pop-up.component.html",
  styleUrls: ["./payment-pop-up.component.scss"],
})
export class PaymentPopUpComponent implements OnInit, AfterViewInit {
  Form!: FormGroup;
  submitted: boolean = false;
  @ViewChild("paymentInput") paymentInput: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public AllData: any,
    private data: MatDialogRef<NotesPopUpComponent>,
    private service: GlobalService
  ) {}
  get f() {
    return this.Form.controls;
  }
  ngAfterViewInit(): void {
    // console.log(this.paymentInput);
    this.paymentInput.nativeElement.focus();
  }
  ngOnInit(): void {
    this.Form = this.fb.group({
      price: ["", Validators.required],
      order_id: [this.AllData],
      isChanged: [0],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    this.Form.patchValue({
      isChanged: 1,
    });
    this.service.UpdatePayment(this.Form.value).subscribe(
      (res: any) => {
        this.data.close("تم ارسال السعر بنجاح");
      },
      (error: any) => {
        this.data.close();
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  Form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      user_name: ["", Validators.required],
      user_phone: ["", Validators.required],
      order_date: ["", Validators.required],
    });
  }
  onSubmit() {
    console.log(this.Form.value);
  }
}

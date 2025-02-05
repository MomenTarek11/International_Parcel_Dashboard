import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-notes-pop-up",
  templateUrl: "./notes-pop-up.component.html",
  styleUrls: ["./notes-pop-up.component.scss"],
})
export class NotesPopUpComponent implements OnInit {
  Form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public AllData: any,
    private data: MatDialogRef<NotesPopUpComponent>,
    private service: GlobalService
  ) {}

  ngOnInit(): void {
    console.log(this.AllData);
    this.Form = this.fb.group({
      notes: ["", Validators.required],
      order_id: [this.AllData],
    });
  }
  onSubmit() {
    console.log(this.Form.value);
    this.service.updateNote(this.Form.value).subscribe(
      (res: any) => {
        this.data.close(res.message);
      },
      (error: any) => {
        this.data.close();
      }
    );
  }
}

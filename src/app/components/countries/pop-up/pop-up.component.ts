import { Component, inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CountriesComponent } from "../countries.component";

@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.scss"],
})
export class PopUpComponent implements OnInit {
  // email = inject(MAT_DIALOG_DATA);
  constructor(private data: MatDialogRef<CountriesComponent>) {}
  ngOnInit(): void {}
  onSubmit() {}
}

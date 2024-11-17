import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-placeholder",
  templateUrl: "./placeholder.component.html",
  styleUrls: ["./placeholder.component.scss"],
})
export class PlaceholderComponent implements OnInit {
  @Input("header") header: any;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-show-photo",
  templateUrl: "./show-photo.component.html",
  styleUrls: ["./show-photo.component.scss"],
})
export class ShowPhotoComponent implements OnInit {
  imageUrl: SafeUrl | null = null;

  constructor(
    private dialogRef: MatDialogRef<ShowPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public AllData: any,
    @Inject(DomSanitizer) private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.AllData?.file instanceof File) {
      // Generate and sanitize the preview URL if a file is passed
      const blobUrl = URL.createObjectURL(this.AllData.file);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    } else if (typeof this.AllData?.data === "string") {
      // Directly use the provided URL string
      this.imageUrl = this.AllData.data;
    }

  }

  close(): void {
    this.dialogRef.close();
  }

  upload(): void {
    this.dialogRef.close(this.imageUrl);
  }
}

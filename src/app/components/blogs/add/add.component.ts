import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BlogsService } from "../blogs.service";
// import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  @ViewChildren('editor') editors: QueryList<any>; 
  maxImageSize = 1 * 1024 * 1024; // 1 MB limit
  imageCount = 0; // Track the number of images inserted
  maxImages = 5; // Limit to 5 images
  submitted: boolean = false;
  notEqual: boolean = false;
  form: FormGroup;
  uploadedImage: any;
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ],
  
    }
  };
  constructor(
    private fb: FormBuilder,
    private service: BlogsService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      title_ar: [
        "",
        [Validators.required],
      ],
      title_en: ["", Validators.required],
      title_cn: ["", Validators.required],
      content_ar: [
        "",
        [Validators.required],
      ],
      content_en: [
        "",
        [Validators.required],
      ],
      content_cn: ["", Validators.required],
      cover: ["", Validators.required],
      is_published:[false]
    });
  }
  submit() {
    this.f.is_published.value==true?this.f.is_published.setValue(1):this.f.is_published.setValue(0);
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.service.createBlog(this.form.value).subscribe(
      (res) => {
        this.spinner.hide();
        this.toaster.success("تم اضافة المقال بنجاح");
        this.router.navigate(["/app/blogs"]);
      },
      (err) => {  
        this.spinner.hide();
        this.toaster.error('حدث خطأ');
      }
    );  
  }
  get f() {
    return this.form.controls;
  }
  UploadImage(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      cover: file,
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

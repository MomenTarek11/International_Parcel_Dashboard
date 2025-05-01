import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
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
  @ViewChildren("editor") editors: QueryList<any>;
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
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image"],
      ],
      handlers: {
        image: () => this.imageHandler(), // Use the image handler for image uploads
      },
    },
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
      title_ar: ["", [Validators.required]],
      title_en: ["", Validators.required],
      title_cn: ["", Validators.required],
      content_ar: ["", [Validators.required]],
      content_en: ["", [Validators.required]],
      content_cn: ["", Validators.required],
      cover: ["", Validators.required],
      is_published: [false],
    });
  }

  submit() {
    this.f.is_published.value == true
      ? this.f.is_published.setValue(1)
      : this.f.is_published.setValue(0);
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
        this.toaster.error("حدث خطأ");
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
  imageHandler() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      if (file) {
        // Validate the file size
        if (file.size > this.maxImageSize) {
          this.toaster.error('حجم الصورة كبير جداً. يرجى اختيار صورة أصغر من 1 MB');
        } else {
          this.uploadImageInQuill(file);
        }
      }
    };
  }
  // Method to upload image using the service
  uploadImageInQuill(file: File) {
    // Step 1: Upload the image
    this.service.uploadFiles(file).subscribe(
      (res: any) => {
        const imageUrl = res?.data[0];
        const activeEditor = this.editors.toArray().find(editor => editor.quillEditor.hasFocus());
  
        if (activeEditor) {
          const editor = activeEditor.quillEditor;
          const range = editor.getSelection();
          const index = range ? range.index : 0;
  
          // Step 2: Insert the image
          editor.insertEmbed(index, 'image', imageUrl);
  
          // Step 3: Wait for DOM to update, then ask for alt text
          setTimeout(() => {
            const editorElem = editor.root as HTMLElement;
            const images = editorElem.querySelectorAll('img');
            const insertedImage = images[images.length - 1] as HTMLImageElement;
  
            if (insertedImage) {
              insertedImage.style.width = '300px';
              insertedImage.style.height = '300px';
              insertedImage.style.objectFit = 'contain';
              insertedImage.style.display = 'block';
              insertedImage.style.margin = '0 auto';
  
              // Ask for alt text
              const altText = prompt('اضف حقل alt للصورة');
              if (altText) {
                insertedImage.setAttribute('alt', altText);
              }
            }
            
            // Update content and form
            const updatedContent = editor.root.innerHTML;
            this.f.content_en.setValue(updatedContent);
            console.log(updatedContent);
          }, 10);
        }
      },
      (error) => {
        this.spinner.hide();
        console.error('Error uploading image:', error);
      }
    );
  }
  
}

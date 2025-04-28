import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { BlogsService } from "../blogs.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  @ViewChild('editor', { static: true }) editor: any;
  maxImageSize = 1 * 1024 * 1024; // 1 MB limit
  imageCount = 0; // Track the number of images inserted
  maxImages = 5; // Limit to 5 images
  submitted: boolean = false;
  notEqual: boolean = false;
  form: FormGroup;
  uploadedImage: any;
  checked:boolean;
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
      // handlers: {
      //   image: () => this.customImageHandler()
      // }
    }
  };
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:BlogsService
  ) {}

  ngOnInit(): void {
console.log(this.data?.published_at!=null); // false and true
    this.form = this.fb.group({
      title_ar: ['', Validators.required],
      title_en: ['', Validators.required],
      title_cn: ['', Validators.required],
      content_ar: [this.data.content_ar, Validators.required],
      content_en: ['', Validators.required],
      content_cn: ['', Validators.required],
      cover: ['', Validators.required],
      is_published:this.data?.published_at!=null
    });
    this.loadBlogData();
  }
  loadBlogData() {
      this.form.patchValue({
        title_ar: this.data.title_ar,
        title_en: this.data.title_en,
        title_cn: this.data.title_cn,
        content_ar: this.data.content_ar,
        content_en: this.data.content_en,
        content_cn: this.data.content_cn,
        cover: this.data?.cover_url,
        is_published:this.data?.published_at!=null
      });
      this.uploadedImage = this.data?.cover_url; 
  }
  onSubmit() {
    if (this.f?.cover?.value == this.data?.cover_url) {
      this.form.removeControl('cover');
    }
    this.f.is_published.value==true?this.f.is_published.setValue(1):this.f.is_published.setValue(0);
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.service.updateBlog(this.data?.id,this.form.value).subscribe(
      (res) => {
        this.dialogRef.close("تم التعديل بنجاح");
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );  
  }
  get f() {
    return this.form.controls;
  }
  get quillEditor() {
    return this.editor?.quillEditor;
  }
  // customImageHandler() {
  //   if (this.imageCount >= this.maxImages) {
  //     alert('You can only upload up to 5 images.');
  //     return;
  //   }
  
  //   const fileInput = document.createElement('input');
  //   fileInput.setAttribute('type', 'file');
  //   fileInput.setAttribute('accept', 'image/*');
  //   fileInput.click();
  
  //   fileInput.onchange = () => {
  //     const file = fileInput.files?.[0];
  //     if (file) {
  //       if (file.size > this.maxImageSize) {
  //         alert('Image size exceeds 1MB. Please upload a smaller image.');
  //         return;
  //       }
  
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         const range = this.quillEditor.getSelection(true);
  //         this.quillEditor.insertEmbed(range.index, 'image', e.target.result, 'user');
  //         this.imageCount++; // Increment image count when a new image is inserted
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  // }
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
  onEditorCreated(editor: any, controlName: string) {
    // Get the content value from the form control
    const content = this.form.get(controlName)?.value;
    console.log(content); // Check the value of content
  
    // If the content exists, directly set it to the editor's root using innerHTML
    if (content) {
      editor.root.innerHTML = content;
    }
  }
  check(event:any){
    this.checked=event.checked;
  }
}

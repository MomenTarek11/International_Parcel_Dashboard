import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { BlogsService } from "../blogs.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  @ViewChildren('editor') editors: QueryList<any>; 
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
        ['link', 'image', ],
      ],
      handlers: {
        image: () => this.imageHandler()  // Use the image handler for image uploads
      }
    }
  };
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:BlogsService,
    private toaster:ToastrService
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
  // get quillEditor() {
  //   return this.editor?.quillEditor;
  // }
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
    // this.spinner.show();
    // Step 1: Upload the image to the API
    this.service.uploadFiles(file).subscribe(
      (res: any) => {
        const imageUrl = res?.data[0]; // Assuming the API response contains the image URL in 'res.data[0]'
  
        // Step 2: Find the editor the user is interacting with (active editor)
        const activeEditor = this.editors.toArray().find(editor => editor.quillEditor.hasFocus());
        if (activeEditor) {
          const editor = activeEditor.quillEditor;
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', imageUrl);
          
            setTimeout(() => {
              const editorElem = editor.root as HTMLElement;
              const images = editorElem.querySelectorAll('img');
              const latestImage = images[images.length - 1] as HTMLImageElement;
          
              if (latestImage) {
                latestImage.style.width = '300px';
                latestImage.style.height = '300px';
                latestImage.style.objectFit = 'contain';
                latestImage.style.display = 'block';
                latestImage.style.margin = '0 auto';
              }
            }, 10); // slight delay to allow image insertion
          } else {
            editor.insertEmbed(0, 'image', imageUrl);
          
            setTimeout(() => {
              const editorElem = editor.root as HTMLElement;
              const images = editorElem.querySelectorAll('img');
              const firstImage = images[0] as HTMLImageElement;
          
              if (firstImage) {
                firstImage.style.width = '300px';
                firstImage.style.height = '300px';
                firstImage.style.objectFit = 'contain';
                firstImage.style.display = 'block';
                firstImage.style.margin = '0 auto';
              }
            }, 10);
          }
  
          // After inserting the image, get the updated content
          const updatedContent = editor.root.innerHTML; // Get the full HTML content (including the image)
          
          // Update the form control with the new content
          this.f.content_en.setValue(updatedContent);
  
          // Set the content back to the editor (in case other actions changed it)
          editor.root.innerHTML = updatedContent;
  
          console.log(imageUrl);
          console.log(updatedContent); // Log the updated content
        }
      },
      (error) => {
        this.spinner.hide();
        console.error('Error uploading image:', error);
      }
    );
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

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {

  form:FormGroup;
  categories;
  image_edit=false;
  baseUrl=environment.baseURL;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
    }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      title_en:[this.data.title_en,Validators.required],
      title_ar:[this.data.title_ar,Validators.required],

      description_en:[this.data.description_en,Validators.required],
      description_ar:[this.data.description_ar,Validators.required],
      service_id:[this.data.id,Validators.required],



    })

  }

  files: File[] = [];

 
  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit(){
    console.log('Form Work')
    this.spinner.show()
    let form={
      ...this.form.value,
      image:this.files[0],
    }
    console.log(form)
    this.service.editService(form).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الخدمه بنجاح',
        'success'
      )
      this.dialog.closeAll()
    })
  }



}

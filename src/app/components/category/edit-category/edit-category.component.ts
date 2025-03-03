import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form:FormGroup;
  image_edit=false;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
      description_ar:[this.data.description_ar,Validators.required],
      description_en:[this.data.description_en,Validators.required],
      price:[this.data.price,Validators.required],
      insaurance:[this.data.insaurance,Validators.required],


    })

  }

  files: File[] = [];

onSelect(event) {
  this.files=[]
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1);
}

  submit(){
    this.spinner.show()
    let form={
      ...this.form.value,
      image:this.files[0],
      company_id:this.data.id
    }
    this.service.editinterNationalCompany(form).subscribe((res:any)=>{
    this.spinner.hide()
    if(res.status == true){
      Swal.fire(
          'نجاح',
          'تم التعديل بنجاح',
          'success'
        )
      }else{
        Swal.fire(
          'نجاح',
          res['errors'][0],
          'success'
        )
      }
      this.dialog.closeAll()
    })
  }



}

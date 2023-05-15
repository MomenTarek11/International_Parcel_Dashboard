import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
    this.service.editCompany(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل عرض سعر بنجاح',
        'success'
      )
      this.dialog.closeAll()
    })
  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

  form:FormGroup;
  city;
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
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
    })
    console.log(this.data)
  }


  submit(){
    console.log('Form Work')
    this.spinner.show()
    let form={

      china_harbor_id:this.data.id,

      ...this.form.value,
    }
    this.service.editchinaHarbour(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الميناء بنجاح',
        'success'
      )
      this.dialog.closeAll()
    })
  }


}

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
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

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

      saudi_harbor_id:this.data.id,

      ...this.form.value,
    }
    this.service.editsaudiHarbour(form).subscribe(res=>{
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent implements OnInit {
  form:FormGroup;

  baseUrl=environment.baseURL
  constructor( private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,    private formbuilder:FormBuilder,
  private spinner:NgxSpinnerService,
  private service:GlobalService,
  private router:Router,
  ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
      description_en:[this.data.description_en,Validators.required],
      description_ar:[this.data.description_ar,Validators.required],

    })
  }

submit(){
  let f = {
    testimonial_id:this.data.id,
    ...this.form.value
  }
  this.spinner.show()

  this.service.editTest(f).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
      'نجااااح',
      'تم التعديل   بنجاح',
      'success'
      )
      this.dialog.closeAll()
      
  })
}
}

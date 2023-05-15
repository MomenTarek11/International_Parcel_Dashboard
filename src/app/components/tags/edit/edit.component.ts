import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],

    })
    console.log('this.data')
    console.log(this.data)
  }


  submit(){
    console.log('Form Work')
    this.spinner.show()
    let form={
      ...this.form.value,
      shipment_type_id:this.data.id
    }
    console.log('submitting the form', form)
    this.service.editShippment(form).subscribe((res:any)=>{
      console.log(res)
    this.spinner.hide()
        if(res.status == true){
          Swal.fire(
            'نجاح',
            'تم تعديل الشحنة بنجاح',
            'success'
          )
        }
        else{
          for (let i = 0; i < res.errors.length; i++) {
            this.toastr.error(res.errors[i]);  
            
          }
        }
      this.dialog.closeAll()
    })
  }



}

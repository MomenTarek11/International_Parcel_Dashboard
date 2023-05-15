import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  form:FormGroup;
  categories;
  submitted=false;
  newdate=new Date()
  datePipe
  date
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder:FormBuilder,
  private spinner:NgxSpinnerService,
  private service:GlobalService,
  private router:Router,private dialog:MatDialog) { }
  

  ngOnInit(): void {
    console.log(this.data)
    this.form=this.formbuilder.group({
      code:[this.data.code,Validators.required],
      discount_precentage:[this.data.discount_precentage,Validators.required],
      expire_at:[this.data.expire_at,Validators.required],


    })
  }




  submit(){
    this.submitted=true;
    if(this.form.invalid){ return}
    this.datePipe= new DatePipe('en-us');
    this.date = this.datePipe.transform(this.form.value['expire_at'],'Y/MM/dd')
    let f = {
      promo_code_id:this.data.id,
      code:this.form.value['code'],
      discount_precentage:this.form.value['discount_precentage'],
      expire_at:this.date,
      
    }
    console.log(f)
    this.spinner.show()
    this.service.editPromo(f).subscribe((res:any)=>{
      console.log(res)
      this.spinner.hide()
      if(res.status == 200){
        Swal.fire(
          'نجاح',
          'تم تعديل  بروموكود  بنجاح',
          'success'
          )
      }
      else{
        Swal.fire(
          'فشل ',
          'لم يتم اضافة بروموكود',
          'error'
          )
      }
      this.dialog.closeAll()

    })
  }

}

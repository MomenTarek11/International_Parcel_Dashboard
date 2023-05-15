import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  form:FormGroup;
  categories;
  submitted=false;
  newdate=new Date()
  datePipe
  date
  constructor(
    private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      code:['',Validators.required],
      discount_precentage:['',Validators.required],
      expire_at:['',Validators.required],


    })
  }




  submit(){
    this.submitted=true;
    if(this.form.invalid){  Swal.fire(
      'فشل ',
      ' يردى ملء جميع الحقول',
      'error'
      )}
    this.datePipe= new DatePipe('en-us');
    this.date = this.datePipe.transform(this.form.value['expire_at'],'Y/MM/dd')
    let f = {
      code:this.form.value['code'],
      discount_precentage:this.form.value['discount_precentage'],
      expire_at:this.date,
      
    }
    console.log(f)
    this.spinner.show()
    this.service.addpromoCode(f).subscribe((res:any)=>{
      console.log(res)
      this.spinner.hide()
      if(res.status == true){
        Swal.fire(
          'نجاح',
          'تم إضافة  بروموكود  بنجاح',
          'success'
          ).then(()=>{
            this.router.navigate(['/app/promocode/list'])
        
                })
      }
      else{
        Swal.fire(
          'فشل ',
          'لم يتم اضافة بروموكود',
          'error'
          )
      }
    })
  }

}

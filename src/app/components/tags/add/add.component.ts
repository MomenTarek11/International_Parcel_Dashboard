import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form:FormGroup;
  categories;
  submitted=false;
  constructor(
    private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router,
    private toastr: ToastrService,

    ) { }

    ngOnInit(): void {
      this.form=this.formbuilder.group({
       name_ar:['',Validators.required],
       name_en:['',Validators.required],

  
      })
    }


  submit(){
    console.log('Form Work')
    this.spinner.show()
    let x={
      ...this.form.value,
    }
    console.log(x)
    this.service.addShippment(x).subscribe((res:any)=>{
      console.log(res)
    this.spinner.hide()
        if(res.status == true ){
          Swal.fire(
            'نجاح',
            'تم إضافة شحنة بنجاح',
            'success'
          )
        }
        else {
          for (let i = 0; i < res.errors.length; i++) {
            this.toastr.error(res.errors[i]);  
            
          }
        }
    })
  }



}

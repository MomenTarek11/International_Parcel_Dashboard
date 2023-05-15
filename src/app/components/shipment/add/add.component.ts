import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
    private router:Router
    ) { }

    ngOnInit(): void {
      this.form=this.formbuilder.group({
        name_ar:['',[Validators.nullValidator,Validators.pattern(/[\u0600-\u06FF]/)]],
        name_en:['' ,[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
        plan_price:['',Validators.required],
        ship_price:['',Validators.required],
  
      })
    }




  submit(){
    console.log('Form Work')
    this.spinner.show()
    let x={
      ...this.form.value,
    }
    console.log(x)
    this.service.addShipmentType(x).subscribe((res:any)=>{
      console.log(res)
    this.spinner.hide()
      if(res.status == true){
        Swal.fire(
          'نجاح',
          'تم الإضافة بنجاح',
          'success'
        ).then(()=>{
    this.router.navigate(['/app/shippment/list'])

        })

      }else{
        Swal.fire('فشل', 'يجب ملء جميع الحقول ', 'warning')
      }
    })
    // this.router.navigate(['/app/banner//list'])
    // window.location.reload()
    
  }



}

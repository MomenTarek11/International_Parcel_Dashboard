import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

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
       name_ar:['',Validators.required],
       name_en:['',Validators.required],
       description_en:['',Validators.required],
       description_ar:['',Validators.required],
  
      })
    }

  files: File[] = [];


  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit(){
    console.log('Form Work')
    this.spinner.show()
    let x={
      ...this.form.value,
      image:this.files[0]
    }
    console.log(x)
    this.service.addCompany(x).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة شركة بنجاح',
        'success'
      ).then(()=>{
        this.router.navigate(['/app/company/list'])
    
            })
    })
  }



}

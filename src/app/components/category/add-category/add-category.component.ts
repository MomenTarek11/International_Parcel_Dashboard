import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
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
       price:['',Validators.required],
       insaurance:['',Validators.required],

  
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
    this.service.addinterNationalCompany(x).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم الأضافة    بنجاح',
        'success'
      )
    })
  }



}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  submit(){
    this.spinner.show()
    this.service.addTestmonials(this.form.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة رأي  بنجاح',
        'success'
        ).then(()=>{
          this.router.navigate(['/app/testmonials/list'])
      
              })
    })
  }
}

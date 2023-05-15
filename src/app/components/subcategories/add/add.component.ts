import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
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
        title_ar:['',Validators.required],
        title_en:['',Validators.required],
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
    this.service.addService(x).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الخدمه بنجاح',
        'success'
      ).then(()=>{
        this.router.navigate(['/app/services/list'])
    
            })
    })
  }


}

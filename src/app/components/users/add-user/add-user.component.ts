import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form:FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required]
    })
  }

  submit(){
    Swal.fire(
      'نجاح',
      'تم إضافة الشخص بنجاح',
      'success'
    )
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  permissions =[]
  form:FormGroup;
  color='#c7d494';
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)]],
      confirm_password:['',[Validators.required,Validators.pattern(/^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)]],
      role:['',Validators.required],




    })
    this.dropdownList = [
      // { section_id: 1, section_name: 'اسعار الشحن الدولى' },
      
      { section_id: 10, section_name: 'الطلبات' },
      { section_id: 11, section_name: 'الطلبات-طلبات جديدة' },
      { section_id: 12, section_name: 'الطلبات-جاري التواصل مع المورد' },
      { section_id: 13, section_name: 'الطلبات-شحنات تحت المراجعة'},
      { section_id: 14, section_name: 'الطلبات-الطلبات المعلقة' },
      { section_id: 15, section_name: 'الطلبات-جاري شحنها من الصين' },
      { section_id: 16, section_name: 'الطلبات-شحنات في ميناء المملكة تحت المراجعة الجمركية' },
      { section_id: 17, section_name: 'الطلبات-شحنات جاري تفريغها في مستودعاتنا' },
      { section_id: 18, section_name: 'الطلبات-شحنات جاري توصيلها للعميل' },
      { section_id: 19, section_name: 'الطلبات-شحنات منتهية' },
      { section_id: 20, section_name: 'الطلبات-شحنات ملغية' },

      { section_id: 1, section_name: 'اراء العملاء' },
      { section_id: 2, section_name: 'البانرات' },
      { section_id: 3, section_name: 'الادمن' },
      { section_id: 4, section_name: "انواع الشحنات" },
      { section_id: 5, section_name: 'العملاء' },
      { section_id: 6, section_name: 'البروموكود' },
      { section_id: 7, section_name: 'التحويلات' },
      { section_id: 8, section_name: "شريط الأخبار" },
      { section_id: 9, section_name: "رسائل العملاء" },
      
      // { section_id: 3, section_name: 'عروض الاسعار' },
      // { section_id: 5, section_name: ' الخدمات' },

      

    ];
    this.selectedItems = [
      
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'section_id',
      textField: 'section_name',
      selectAllText: ' اختيار الكل',
      unSelectAllText: ' الغاء الاختيار',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {

    this.permissions.push(item)
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.permissions = items
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
    let form={
      ...this.form.value,
      image:this.files[0],
      sections:this.permissions
    }
    this.service.addAdmin(form).subscribe((res:any)=>{
      console.log(res)
      this.spinner.hide()
      if(res.status == false){
        for (let i = 0; i < res.errors.length; i++) {
          this.toastr.error(res.errors[i]);  
          
        }

      }
      else{

        Swal.fire(
            'نجاح',
            'تم إضافة ادمن بنجاح',
            'success'
          ).then(()=>{
            this.router.navigate(['/app/admins/list'])
        
                })
      }
      // this.router.navigate(['/app/sizes/list'])
    })
  }

  Hi(){
    console.log('dsjbhfsdjhgdjshg')
  }

}

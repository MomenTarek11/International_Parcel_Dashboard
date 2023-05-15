import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EditSubcategoryComponent } from '../edit-subcategory/edit-subcategory.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  services;
  baseUrl=environment.baseURL;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.serviceList()
  }

  serviceList(){
    this.spinner.show()
    this.service.getServices().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.services=res
    })
  }
  deleteApp(service_id){
    console.log(service_id)
    this.spinner.show()
    this.service.deleteService(service_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف الخدمه بنجاح',
        'success'
        )
        this.serviceList()
    })
  }
  editPackage(category){
    console.log(category)
    let dialogRef = this.dialog.open(EditSubcategoryComponent, {
      data:category,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.serviceList()
    });
  }
}

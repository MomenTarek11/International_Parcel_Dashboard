import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { EditComponent } from '../edit/edit.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  banners;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.companyList()
  }

  companyList(){
    this.spinner.show()
    this.service.getCompanies().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
      this.banners=res
    })
  }
  deleteApp(banner_id){
    this.spinner.show()
    this.service.deleteCompany(banner_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف الشركه بنجاح',
        'success'
        )
        this.companyList()
    })
  }
  editPackage(category){
    console.log(category)
    let dialogRef = this.dialog.open(EditComponent, {
      data:category,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.companyList()
    });
  }
}
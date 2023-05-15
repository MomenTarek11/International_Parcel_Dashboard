import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  banners;
  baseUrl=environment.baseURL;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.bannersList()
  }

  bannersList(){
    this.spinner.show()
    this.service.getinterNationalCompanies().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.banners=res
    })
  }
  deleteApp(banner_id){
    console.log(banner_id)
    this.spinner.show()
    this.service.deleteinterNationalCompany(banner_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف الشركة بنجاح',
        'success'
        )
        this.bannersList()
    })
  }
  editPackage(category){
    console.log(category)
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      data:category,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.bannersList()
    });
  }
  viewPack(category){
    console.log(category)
    let dialogRef = this.dialog.open(CategoryDetailsComponent, {
      data:category,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.bannersList()
    });
  }
}


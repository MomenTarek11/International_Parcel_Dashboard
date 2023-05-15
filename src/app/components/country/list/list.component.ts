import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/global.service';
import { EditCountryComponent } from '../edit-country/edit-country.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  brands;
  baseUrl=environment.baseURL;
  countries;
  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private service:GlobalService
    ) { }

  ngOnInit(): void {
    this.countryList()
  }

  countryList(){
    this.spinner.show()
    this.service.getchinaHarbour().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      console.log('res')
      console.log(res)
      this.countries=res
    })
  }


 
  deleteApp(city_id){
    this.spinner.show()
    this.service.deletechinaHarbour(city_id).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم حذف الميناء بنجاح',
        'success'
        )
        this.countryList()
      })
   
  }

  editCity(city){
    let dialogRef = this.dialog.open(EditCountryComponent, {
      data:city,
      height: '450px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.countryList()
    });
  }



}

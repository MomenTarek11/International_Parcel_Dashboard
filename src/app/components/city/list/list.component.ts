import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/global.service';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities;
  baseUrl=environment.baseURL;
  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private service:GlobalService
    ) { }

  ngOnInit(): void {
    this.cityList()
  }

  cityList(){
    this.spinner.show()
    this.service.getsaudiHarbour().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      console.log('res')
      console.log(res)
      this.cities=res
    })
  }


  deleteApp(city_id){
    this.spinner.show()
    this.service.deletesaudiHarbour(city_id).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم حذف الميناء بنجاح',
        'success'
        )
        this.cityList()
      })
   
  }

  editCity(city){
    let dialogRef = this.dialog.open(EditCityComponent, {
      data:city,
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cityList()
    });
  }


}

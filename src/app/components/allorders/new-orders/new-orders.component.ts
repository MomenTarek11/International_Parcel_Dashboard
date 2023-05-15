import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})
export class NewOrdersComponent implements OnInit {
  orders;
  active=0;
  companies
  selectedOption
  company_id 
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    console.log(this.company_id)
    this.getCompanies()
    this.clientList(0,this.active)
    
  }
  getCompanies(){
        this.service.getCompanies().pipe(map(res=>res['data'])).subscribe(res=>{
      console.log(res)
      this.spinner.hide()
      this.companies=res
    })
  }
  getCompany(company){
    this.company_id = company
    console.log(company)
    this.clientList(company,this.active)
  }
  clientList(company,active){
    console.log('company_id',company)
    console.log('status',active)

    this.spinner.show()
    this.service.getOrders(company,active).pipe(map(res=>res['data'].data)).subscribe(res=>{
      console.log(res)
      this.spinner.hide()
      this.orders=res
    })
  }

 
  changeStatus(user_id,status_id){
    this.spinner.show()
    this.service.ChangeOrdersStatus(user_id,status_id).subscribe((res:any)=>{
      console.log(res)
      this.spinner.hide()
    })
  }
  confirmOrder(order_id){
    this.spinner.show()
    this.service.ConfirmOrder(order_id).subscribe((res:any)=>{
      this.spinner.hide()
      console.log(res)
      this.clientList(this.company_id,this.active)

    })
  }
  reciveOrder(order_id){
    this.spinner.show()
    this.service.recieveOrder(order_id).subscribe((res:any)=>{
      this.spinner.hide()
      console.log(res)
      this.clientList(this.company_id,this.active)
    })
  }
  finishOrder(order_id){
    this.spinner.show()
    this.service.finishOrder(order_id).subscribe((res:any)=>{
      this.spinner.hide()
      console.log(res)
      this.clientList(this.company_id,this.active)
    })
  }
  viewOrder(order){
    let dialogRef = this.dialog.open(DetailsComponent, {
      data:order,
      height: '450px',
      width: '600px',
    });

  }





}

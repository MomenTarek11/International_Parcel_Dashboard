import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDetailsComponent } from '../list/order-details/order-details.component';

@Component({
  selector: 'app-special-orders',
  templateUrl: './special-orders.component.html',
  styleUrls: ['./special-orders.component.scss']
})
export class SpecialOrdersComponent implements OnInit {

  orders;
  type='new';
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.orderList(1,'new')
  }

  orderList(special,progress){
    // this.spinner.show()
    // this.service.allOrders(special,progress).pipe(map(res=>res['data'])).subscribe(res=>{
    //   this.spinner.hide()
    //   this.orders=res
    // })
  }
  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(order){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data:order,
      height: '600px',
      width: '600px',
    });
  }
  getOrders(progress){
    this.type=progress
    this.orderList(1,progress)
  }
}

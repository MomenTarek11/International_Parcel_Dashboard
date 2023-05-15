import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderDetailsComponent } from '../../provider/provider-details/provider-details.component';
import { UserDetailsComponent } from '../../users/user-details/user-details.component';
import { OrderDetailsComponent } from '../../orders/list/order-details/order-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-related-order',
  templateUrl: './user-related-order.component.html',
  styleUrls: ['./user-related-order.component.scss']
})
export class UserRelatedOrderComponent implements OnInit {

  orders;
  type=0;
  user_id=this.route.snapshot.paramMap.get('user-id');
  
  constructor(
    private dialog:MatDialog,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.filterOrdersByuserId(this.user_id)
  }

  filterOrdersByuserId(user_id){
    this.spinner.show()
    this.service.filterOrdersByuserId(user_id).pipe(map(res=>res['data'])).subscribe(res=>{
        this.spinner.hide()
        this.orders=res
      })
  }
  
  orderDetails(order){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data:order,
      height: '650px',
      width: '600px',
    });
  }

  
  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  
  getOrders(progress){
    this.type=progress
  }



  providerDetails(user){
    let dialogRef = this.dialog.open(ProviderDetailsComponent, {
      data:user,
      height: '650px',
      width: '600px',
    });
  }

  userDetails(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '500px',
      width: '600px',
    });
  }
}

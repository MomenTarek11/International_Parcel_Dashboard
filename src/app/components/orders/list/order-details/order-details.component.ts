import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailsComponent } from 'src/app/components/products/product-details/product-details.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  // baseUrl=environment.baseURL
  constructor(@Inject(MAT_DIALOG_DATA)public data: any,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('this.data')
    console.log(this.data)
    console.log(this.data)
  }


  productDetails(product){
    this.dialog.closeAll()
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      data:product,
      height: '600px',
      width: '600px',
    });
  }

}

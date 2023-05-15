import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListComponent } from './list/list.component';
import { OrderDetailsComponent } from './list/order-details/order-details.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpecialOrdersComponent } from './special-orders/special-orders.component';


@NgModule({
  declarations: [ListComponent, OrderDetailsComponent, SpecialOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ]
})
export class OrdersModule { }

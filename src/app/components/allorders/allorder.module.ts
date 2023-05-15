import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ListComponent } from './list/list.component';
import { AllOrdersModule } from './allorders-routing.module';
import { DetailsComponent } from './details/details.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { RecievedChinaComponent } from './recieved-china/recieved-china.component';
import { InChinaComponent } from './in-china/in-china.component';
import { FromChinaComponent } from './from-china/from-china.component';
import { RecivedSaudiComponent } from './recived-saudi/recived-saudi.component';
import { InSaudiComponent } from './in-saudi/in-saudi.component';
import { FromSaudiComponent } from './from-saudi/from-saudi.component';
import { ToClientComponent } from './to-client/to-client.component';
import { FinishedComponent } from './finished/finished.component';


@NgModule({
  declarations: [ListComponent,DetailsComponent, NewOrdersComponent, ConfirmedOrdersComponent, RecievedChinaComponent, InChinaComponent, FromChinaComponent, RecivedSaudiComponent, InSaudiComponent, FromSaudiComponent, ToClientComponent, FinishedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AllOrdersModule
  ]
})
export class OrderModule { }
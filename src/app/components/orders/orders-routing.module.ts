import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SpecialOrdersComponent } from './special-orders/special-orders.component';

const routes: Routes = [
  {path:'list',component:ListComponent},
  {path:'special',component:SpecialOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

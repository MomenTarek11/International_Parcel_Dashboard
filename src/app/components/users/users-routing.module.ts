import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ClientsComponent } from './clients/clients.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ListComponent } from './delivery/list/list.component';
import { StoresComponent } from './stores/stores.component';
import { UserRelatedOrderComponent } from './user-related-order/user-related-order.component';

const routes: Routes = [
  {path:'list',component:ClientsComponent,data:{title:'  جميع البروموكود'}},
  {path:'add',component:StoresComponent ,data:{title:'  اضافة بروموكود'}},
  {path:'delivery',component:DeliveryComponent},
  {path:'list',component:ListComponent},
  {path:'user-orders/:user-id',component:UserRelatedOrderComponent,data:{title:'الطلبات الخاصة بالعميل'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

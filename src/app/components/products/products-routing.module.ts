import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'list',component:ListComponent,data:{title:'قائمة عروض الاسعار '}},
  {path:'add',component:ProductDetailsComponent,data:{title:'أضافة  عرض سعر  '}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

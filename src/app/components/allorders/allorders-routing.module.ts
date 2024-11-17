import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmedOrdersComponent } from "./confirmed-orders/confirmed-orders.component";
import { FinishedComponent } from "./finished/finished.component";
import { FromChinaComponent } from "./from-china/from-china.component";
import { FromSaudiComponent } from "./from-saudi/from-saudi.component";
import { InChinaComponent } from "./in-china/in-china.component";
import { InSaudiComponent } from "./in-saudi/in-saudi.component";
import { ListComponent } from "./list/list.component";
import { RecievedChinaComponent } from "./recieved-china/recieved-china.component";
import { RecivedSaudiComponent } from "./recived-saudi/recived-saudi.component";
import { ToClientComponent } from "./to-client/to-client.component";

const routes: Routes = [
  {
    path: "newOrder",
    component: ListComponent,
    data: { title: "طلبات جديده" },
  },
  {
    path: "confirmedOrders",
    component: ConfirmedOrdersComponent,
    data: { title: "جاري التواصل مع المورد" },
  },
  {
    path: "recievedChina",
    component: RecievedChinaComponent,
    data: { title: "شحنات تحت المراجعة" },
  },
  {
    path: "inChina",
    component: InChinaComponent,
    data: { title: "الشحنات المعلقة " },
  },
  {
    path: "fromChina",
    component: FromChinaComponent,
    data: { title: "طلبات جاري شحنها من الصين" },
  },
  {
    path: "recievedSaudi",
    component: RecivedSaudiComponent,
    data: { title: "شحنات في ميناء المملكة تحت المراجعة الجمركية" },
  },
  {
    path: "inSaudi",
    component: InSaudiComponent,
    data: { title: "شحنات جاري تفريغها في مستودعاتنا" },
  },
  {
    path: "fromSaudi",
    component: FromSaudiComponent,
    data: { title: "شحنات جاري توصيلها للعميل" },
  },
  {
    path: "toClient",
    component: ToClientComponent,
    data: { title: "شحنات منتهية" },
  },
  {
    path: "Finished",
    component: FinishedComponent,
    data: { title: "شحنات ملغية" },
  }, //done
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOrdersModule {}

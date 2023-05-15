import { shipmentModule } from './components/shipment/occasions.module';
import { UsersModule } from './components/users/users.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CategoryModule } from './components/category/category.module';
import { OrdersModule } from './components/orders/orders.module';
import { ProviderModule } from './components/provider/provider.module';
import { CountryModule } from './components/country/country.module';
import { CityModule } from './components/city/city.module';
import { SubcategoriesModule } from './components/subcategories/subcategories.module';
import { ProductsModule } from './components/products/products.module';
import { ColorsModule } from './components/colors/colors.module';
import { SizesModule } from './components/sizes/sizes.module';
import { OccasionsModule } from './components/occasions/occasions.module';
import { TagsModule } from './components/tags/tags.module';
import { OrderModule } from './components/allorders/allorder.module';
import { NewsModule } from './components/news/occasions.module';
import { contactUsModule } from './components/contact-us/occasions.module';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'auth/login',component:LoginComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      // {path:'',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
      {path:'home',component:HomeComponent, data: { title: 'الصفحة الشخصية' }},
    ]
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {path:'promocode',loadChildren:()=>UsersModule},
      {path:'testmonials',loadChildren:()=>ProviderModule},
      {path:'clients',loadChildren:()=>OrdersModule},
      {path:'chinaHarbour',loadChildren:()=>CountryModule},
      {path:'saudiHarbour',loadChildren:()=>CityModule},
      {path:'international',loadChildren:()=>CategoryModule},
      {path:'services',loadChildren:()=>SubcategoriesModule},
      {path:'company',loadChildren:()=>ProductsModule},
      {path:'colors',loadChildren:()=>ColorsModule},
      {path:'admins',loadChildren:()=>SizesModule},
      {path:'banner',loadChildren:()=>OccasionsModule},
      {path:'transactions',loadChildren:()=>TagsModule},
      {path:'orders',loadChildren:()=>OrderModule},
      {path:'shippment',loadChildren:()=>shipmentModule},
      {path:'news',loadChildren:()=>NewsModule},
      {path:'contact-us',loadChildren:()=>contactUsModule},

    ]
  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

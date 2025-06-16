import { shipmentModule } from "./components/shipment/occasions.module";
import { UsersModule } from "./components/users/users.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WrongRouteComponent } from "./components/auth/errors/wrong-route/wrong-route.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { OrdersModule } from "./components/orders/orders.module";
import { ProviderModule } from "./components/provider/provider.module";
import { CityModule } from "./components/city/city.module";
import { ProductsModule } from "./components/products/products.module";
import { SizesModule } from "./components/sizes/sizes.module";
import { OccasionsModule } from "./components/occasions/occasions.module";
import { TagsModule } from "./components/tags/tags.module";
import { OrderModule } from "./components/allorders/allorder.module";
import { NewsModule } from "./components/news/occasions.module";
import { contactUsModule } from "./components/contact-us/occasions.module";
import { CountriesModule } from "./components/countries/countries.module";
import { CitiesModule } from "./components/cities/cities.module";
import { SidebarGuard } from "./guards/sidebar.guard";
import { BlogsModule } from "./components/blogs/blogs.module";
import { SeoComponent } from "./components/seo/seo.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "auth/login", component: LoginComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
        data: { title: "الصفحة الشخصية" },
      },
    ],
  },
  {
    path: "app",
    canActivate: [AuthGuard], // First, check if the user is authenticated
    component: DashboardLayoutComponent,
    children: [
      {
        path: "promocode",
        canActivate: [SidebarGuard],
        loadChildren: () => UsersModule,
      },
      {
        path: "testmonials",
        canActivate: [SidebarGuard],
        loadChildren: () => ProviderModule,
      },
      {
        path: "clients",
        canActivate: [SidebarGuard],
        loadChildren: () => OrdersModule,
      },
      
      {
        path: "saudiHarbour",
        canActivate: [SidebarGuard],
        loadChildren: () => CityModule,
      },
     
    
      {
        path: "company",
        canActivate: [SidebarGuard],
        loadChildren: () => ProductsModule,
      },
      {
        path: "admins",
        canActivate: [SidebarGuard],
        loadChildren: () => SizesModule,
      },
      {
        path: "banner",
        canActivate: [SidebarGuard],
        loadChildren: () => OccasionsModule,
      },
      {
        path: "transactions",
        canActivate: [SidebarGuard],
        loadChildren: () => TagsModule,
      },
      {
        path: "orders",
        canActivate: [SidebarGuard],
        loadChildren: () => OrderModule,
      },
      {
        path: "shippment",
        canActivate: [SidebarGuard],
        loadChildren: () => shipmentModule,
      },
      {
        path: "news",
        canActivate: [SidebarGuard],
        loadChildren: () => NewsModule,
      },
      {
        path: "contact-us",
        canActivate: [SidebarGuard],
        loadChildren: () => contactUsModule,
      },
      {
        path: "countries",
        canActivate: [SidebarGuard],
        loadChildren: () => CountriesModule,
      },
      {
        path: "cities",
        canActivate: [SidebarGuard],
        loadChildren: () => CitiesModule,
      },
      {
        path:"blogs",
        canActivate: [SidebarGuard],
        loadChildren: () => BlogsModule,
      },
      {
        path:"seo",
        canActivate: [SidebarGuard],
        component:SeoComponent
      }
    ],
  },

  {
    path: "**",
    pathMatch: "full",
    component: WrongRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

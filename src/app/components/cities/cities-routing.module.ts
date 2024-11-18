import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCityComponent } from "./add-city/add-city.component";
import { CitiesComponent } from "./cities.component";

const routes: Routes = [
  {
    path: "",
    component: CitiesComponent,
  },
  {
    path: "add",
    component: AddCityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitiesRoutingModule {}

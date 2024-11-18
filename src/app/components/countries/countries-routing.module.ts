import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountriesComponent } from "./countries.component";
import { AddComponent } from "./add/add.component";

const routes: Routes = [
  {
    path: "",
    component: CountriesComponent,
  },
  {
    path: "add",
    component: AddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}

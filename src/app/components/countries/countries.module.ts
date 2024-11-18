import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CountriesRoutingModule } from "./countries-routing.module";
import { CountriesComponent } from "./countries.component";
import { AddComponent } from "./add/add.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CountriesComponent, AddComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CountriesModule {}

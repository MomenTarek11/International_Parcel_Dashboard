import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CountriesRoutingModule } from "./countries-routing.module";
import { CountriesComponent } from "./countries.component";
import { AddComponent } from "./add/add.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlaceholderComponent } from "src/app/shared/placeholder/placeholder.component";

@NgModule({
  declarations: [CountriesComponent, AddComponent, PlaceholderComponent],
  imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule],
})
export class CountriesModule {}

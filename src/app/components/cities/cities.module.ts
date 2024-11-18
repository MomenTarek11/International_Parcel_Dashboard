import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CitiesRoutingModule } from "./cities-routing.module";
import { AddCityComponent } from "./add-city/add-city.component";
import { CitiesComponent } from "./cities.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [AddCityComponent, CitiesComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CitiesModule {}

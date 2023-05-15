import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { EditCityComponent } from './edit-city/edit-city.component';


@NgModule({
  declarations: [ListComponent, AddComponent, EditCityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class CityModule { }

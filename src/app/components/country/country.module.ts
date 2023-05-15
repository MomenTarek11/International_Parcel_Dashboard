import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditCountryComponent } from './edit-country/edit-country.component';


@NgModule({
  declarations: [ListComponent, AddComponent, EditCountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class CountryModule { }

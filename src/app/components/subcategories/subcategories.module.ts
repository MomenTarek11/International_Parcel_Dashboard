import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';


@NgModule({
  declarations: [AddComponent, ListComponent, EditSubcategoryComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubcategoriesModule { }

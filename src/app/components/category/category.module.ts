import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListComponent } from './list/list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatIconModule} from '@angular/material/icon';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [ListComponent,AddCategoryComponent, CategoryDetailsComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }

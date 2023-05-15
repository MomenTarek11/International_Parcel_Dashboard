import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { OccasionsRoutingModule } from './occasions-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    OccasionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class OccasionsModule { }

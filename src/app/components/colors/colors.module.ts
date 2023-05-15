import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ColorsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ListComponent } from './list/list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, ProviderDetailsComponent, AddComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProviderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { DetialsComponent } from './detials/detials.component';
import { EditComponent } from './edit/edit.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ListComponent } from './list/list.component';
import { PlaceholderComponent } from 'src/app/shared/placeholder/placeholder.component';


@NgModule({
  declarations: [
    DetialsComponent,
    EditComponent,
    ListComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    MatSlideToggleModule,
    
  ]
})
export class BlogsModule { }

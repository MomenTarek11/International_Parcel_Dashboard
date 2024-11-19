import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TagsRoutingModule } from "./tags-routing.module";
import { AddComponent } from "./add/add.component";
import { ListComponent } from "./list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditComponent } from "./edit/edit.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // NgxDropzoneModule
  ],
})
export class TagsModule {}

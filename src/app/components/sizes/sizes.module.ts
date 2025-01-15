import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { SizesRoutingModule } from "./sizes-routing.module";
import { AddComponent } from "./add/add.component";
import { ListComponent } from "./list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from "ngx-dropzone";
import { EditComponent } from "./edit/edit.component";
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "src/app/shared/shared.module";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    SizesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxDropzoneModule,
    // NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    SharedModule,
    NgSelectModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SizesModule {}

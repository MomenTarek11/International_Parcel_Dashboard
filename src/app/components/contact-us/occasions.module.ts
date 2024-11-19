import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDropzoneModule } from "ngx-dropzone";

import { contactUsRoutingModule } from "./occasions-routing.module";
import { ListComponent } from "./list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    contactUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModule,
  ],
})
export class contactUsModule {}

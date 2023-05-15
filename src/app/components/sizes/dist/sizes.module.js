"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SizesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sizes_routing_module_1 = require("./sizes-routing.module");
var add_component_1 = require("./add/add.component");
var list_component_1 = require("./list/list.component");
var forms_1 = require("@angular/forms");
var ngx_dropzone_1 = require("ngx-dropzone");
var edit_component_1 = require("./edit/edit.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var select_1 = require("@angular/material/select");
var SizesModule = /** @class */ (function () {
    function SizesModule() {
    }
    SizesModule = __decorate([
        core_1.NgModule({
            declarations: [add_component_1.AddComponent, list_component_1.ListComponent, edit_component_1.EditComponent],
            imports: [
                common_1.CommonModule,
                sizes_routing_module_1.SizesRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_dropzone_1.NgxDropzoneModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                select_1.MatSelectModule,
            ]
        })
    ], SizesModule);
    return SizesModule;
}());
exports.SizesModule = SizesModule;

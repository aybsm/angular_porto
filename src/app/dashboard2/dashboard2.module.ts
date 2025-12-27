import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Dashboard2Component } from "./dashboard2.component";
import { FormatCompactPipe } from "../pipes/format-compact.pipe";

import { DxDataGridModule } from "devextreme-angular/ui/data-grid";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { GridTopconsumersComponent } from './components/grid-topconsumers/grid-topconsumers.component';
import { SymbolComponent } from './components/symbol/symbol.component';

@NgModule({
  declarations: [Dashboard2Component, FormatCompactPipe, GridTopconsumersComponent, SymbolComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class Dashboard2Module {}

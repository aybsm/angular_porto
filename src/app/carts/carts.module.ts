import { NgModule } from "@angular/core";
import { CartsComponent } from "./carts.component";

import { DxDataGridModule } from "devextreme-angular";
import { SymbolComponent } from './components/symbol/symbol.component';

@NgModule({
  imports: [DxDataGridModule],
  declarations: [CartsComponent, SymbolComponent],
})
export class CartsModule {}

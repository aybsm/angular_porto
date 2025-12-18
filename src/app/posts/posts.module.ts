import { NgModule } from "@angular/core";
import { PostsComponent } from "./posts.component";

import { DxDataGridModule } from "devextreme-angular";
import { SymbolComponent } from './components/symbol/symbol.component';

@NgModule({
  imports: [DxDataGridModule],
  declarations: [PostsComponent, SymbolComponent],
})
export class PostsModule {}

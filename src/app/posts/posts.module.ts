import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostsComponent } from "./posts.component";

// import { DxDataGridModule } from "devextreme-angular";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { SymbolComponent } from "./components/symbol/symbol.component";

@NgModule({
  imports: [CommonModule, DxDataGridModule],
  declarations: [PostsComponent, SymbolComponent],
})
export class PostsModule {}

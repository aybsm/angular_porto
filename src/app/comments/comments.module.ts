import { NgModule } from "@angular/core";
import { CommentsComponent } from "./comments.component";

// import { DxDataGridModule } from "devextreme-angular";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@NgModule({
  imports: [DxDataGridModule],
  declarations: [CommentsComponent],
})
export class CommentsModule {}

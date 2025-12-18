import { NgModule } from "@angular/core";
import { CommentsComponent } from "./comments.component";

import { DxDataGridModule } from "devextreme-angular";

@NgModule({
  imports: [DxDataGridModule],
  declarations: [CommentsComponent],
})
export class CommentsModule {}

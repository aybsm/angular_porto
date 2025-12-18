import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";

import { DxDataGridModule } from "devextreme-angular";

@NgModule({
  imports: [DxDataGridModule],
  declarations: [UsersComponent],
})
export class UsersModule {}

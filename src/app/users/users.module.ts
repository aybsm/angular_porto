import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";

// import { DxDataGridModule } from "devextreme-angular";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@NgModule({
  imports: [DxDataGridModule],
  declarations: [UsersComponent],
})
export class UsersModule {}

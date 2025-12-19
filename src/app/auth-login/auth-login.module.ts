import { NgModule } from "@angular/core";
import { AuthLoginComponent } from "./auth-login.component";

// import { DxDataGridModule } from "devextreme-angular";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@NgModule({
  imports: [DxDataGridModule],
  declarations: [AuthLoginComponent],
})
export class AuthLoginModule {}

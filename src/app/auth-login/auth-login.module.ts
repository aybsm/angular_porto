import { NgModule } from "@angular/core";
import { AuthLoginComponent } from "./auth-login.component";

import { DxDataGridModule } from "devextreme-angular";

@NgModule({
  imports: [DxDataGridModule],
  declarations: [AuthLoginComponent],
})
export class AuthLoginModule {}

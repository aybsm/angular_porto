import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from "./products.component";
// import { ProductsService } from "../../services/products.service";

// import { DxDataGridModule, DxProgressBarModule } from "devextreme-angular";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxProgressBarModule } from 'devextreme-angular/ui/progress-bar';
import { StockBadgeComponent } from "./components/stock-badge/stock-badge.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { PriceSymbolComponent } from "./components/price-symbol/price-symbol.component";
@NgModule({
  // imports: [CommonModule, HttpClientModule, DxDataGridModule],
  imports: [DxDataGridModule, DxProgressBarModule],
  declarations: [
    ProductsComponent,
    StockBadgeComponent,
    StarRatingComponent,
    PriceSymbolComponent,
  ],
  // providers: [ProductsService],
})
export class ProductsModule {}

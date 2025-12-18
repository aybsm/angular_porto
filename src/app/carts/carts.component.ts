import { Component, OnInit } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { CartsService } from "services/carts.service";
import { lastValueFrom } from "rxjs";

interface CellPreparedEvent {
  cellElement: any;
  rowType: "data" | "header" | "group" | "filter" | "detail";
  column: any;
  data: any;
  value: any;
}

@Component({
  selector: "app-carts",
  templateUrl: "./carts.component.html",
  styleUrls: ["./carts.component.scss"],
  providers: [CartsService],
})
export class CartsComponent implements OnInit {
  dataSource: DataSource;
  collapsed = false;

  constructor(private cartsservice: CartsService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          const observable = this.cartsservice.get();
          return lastValueFrom(observable)
            .then((data: any) => {
              return { data: data.carts, totalCount: data.total };
            })
            .catch((error) => {
              console.error("Gagal memuat data dari Service:", error);
              throw "Data Loading Error";
            });
        },
      }),
    });
  }

  ngOnInit(): void {}
  onCellPreparedHandler(e: CellPreparedEvent) {
    if (e.rowType == "header") {
      // e.cellElement.css("text-align", "center");
      e.cellElement.style.textAlign = "center";
    }
  }
}

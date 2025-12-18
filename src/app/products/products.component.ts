// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
// import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { DataSource } from 'devextreme-angular/common/data';
// import { DataSourceOptions } from "devextreme/data/data_source";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { ProductsService } from "services/products.service";
import { lastValueFrom } from "rxjs";

// if (!/localhost/.test(document.location.host)) {
//   enableProdMode();
// }

// let modulePrefix = "";
// // @ts-ignore
// if (window && window.config?.packageConfigPaths) {
//   modulePrefix = "/app";
// }

interface CellPreparedEvent {
  cellElement: any; // Elemen DOM sel
  rowType: "data" | "header" | "group" | "filter" | "detail";
  column: any; // Informasi kolom
  data: any; // Data baris PENUH (mengandung semua properti dari ProductModel)
  value: any; // Nilai spesifik dari sel yang sedang diproses
  // ... properti lain
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
  providers: [ProductsService],
})
export class ProductsComponent implements OnInit {
  dataSource: DataSource;
  collapsed = false;

  // // mirip repository
  // constructor(service: Service) {
  //   this.dataSource = service.getDataSource();
  // }

  // constructor() {
  //   this.dataSource = new DataSource({
  //     store: new CustomStore({
  //       key: "id",
  //       load: (loadOptions) => {
  //         const url =
  //           "https://dummyjson.com/products?limit=25&skip=0&select=id,title,category,price,rating,stock,brand";

  //         return fetch(url)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             return {
  //               data: data.products,
  //               totalCount: data.total,
  //             };
  //           })
  //           .catch((error) => {
  //             console.error("Gagal memuat data:", error);
  //             throw "Data Loading Error";
  //           });
  //       },
  //     }),
  //   });
  // }

  constructor(private productsservice: ProductsService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          const observable = this.productsservice.get();
          return lastValueFrom(observable)
            .then((data: any) => {
              // ... logika pemrosesan data
              return { data: data.products, totalCount: data.total };
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
  onRefreshClick() {
    this.dataSource.reload();
  }
  onCellPreparedHandler(e: CellPreparedEvent) {
    if (e.rowType == "header") {
      // e.cellElement.css("text-align", "center");
      e.cellElement.style.textAlign = "center";
    }
  }
}

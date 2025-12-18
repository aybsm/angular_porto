import { Component, OnInit } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { PostsService } from "services/posts.service";
import { lastValueFrom } from "rxjs";
// import * as DxDataGridTypes from "devextreme/ui/data_grid";
// import * as DxDataGridTypes from 'devextreme-angular/ui/data-grid';
// import SelectionChangedEvent from "devextreme/ui/data_grid";

interface CellPreparedEvent {
  cellElement: any;
  rowType: "data" | "header" | "group" | "filter" | "detail";
  column: any;
  data: any;
  value: any;
}

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
  providers: [PostsService],
})
export class PostsComponent implements OnInit {
  dataSource: DataSource;
  collapsed = false;

  constructor(private postservice: PostsService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          const observable = this.postservice.get();
          return lastValueFrom(observable)
            .then((data: any) => {
              return { data: data.posts, totalCount: data.total };
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
      e.cellElement.style.textAlign = "center";
    }
  }
  // onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent) {
  //   e.component.collapseAll(-1);
  //   e.component.expandRow(e.currentSelectedRowKeys[0]);
  // }
  onSelectionChanged(e: any) {
    const gridinstance = e.component;
    //console.log(gridinstance.getSelectedRowKeys());
    gridinstance.collapseAll(-1);
    gridinstance.expandRow(gridinstance.getSelectedRowKeys()[0]);
  }
  calculateRatioLikes(rowData: any): number | string {
    const likes = rowData.reactions.likes || 0;
    const views = rowData.views || 0;

    if (views === 0) {
      // Hindari pembagian dengan nol
      return "N/A";
    }

    // Hitung rasio dan bulatkan (misalnya, menjadi 2 angka desimal)
    return (likes / views) * 100.0;
    // return ratio.toFixed(2);
  }
  calculateRatioDislikes(rowData: any): number | string {
    const likes = rowData.reactions.dislikes || 0;
    const views = rowData.views || 0;

    if (views === 0) {
      return "N/A";
    }

    return (likes / views) * 100.0;
  }
}

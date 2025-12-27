import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-grid-topconsumers",
  templateUrl: "./grid-topconsumers.component.html",
  styleUrls: ["./grid-topconsumers.component.scss"],
})
export class GridTopconsumersComponent implements OnInit {
  @Input() DataSource: any;

  constructor() {}

  ngOnInit(): void {}
}

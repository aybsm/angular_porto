import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-price-symbol",
  templateUrl: "./price-symbol.component.html",
  styleUrls: ["./price-symbol.component.scss"],
})
export class PriceSymbolComponent implements OnInit {
  @Input() priceSymbol: string;
  @Input() priceValue: number;

  constructor() {}

  ngOnInit(): void {}
}

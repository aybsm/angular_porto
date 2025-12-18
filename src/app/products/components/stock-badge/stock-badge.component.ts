import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-stock-badge",
  templateUrl: "./stock-badge.component.html",
  styleUrls: ["./stock-badge.component.scss"],
})
export class StockBadgeComponent implements OnInit {
  @Input() stockValue: number;
  @Input() stockTxt: string;
  @Input() moqValue: number;

  badgeCls: string;
  badgeTxt: string;
  constructor() {}

  ngOnInit(): void {
    // Logika Anda untuk menentukan badgeCls dan badgeTxt
    if (this.stockValue < 3 * this.moqValue) {
      this.badgeCls = "bg-danger text-white";
      this.badgeTxt = "CRITICAL";
    } else if (this.stockValue <= 5 * this.moqValue) {
      this.badgeCls = "bg-warning text-dark";
      this.badgeTxt = "LIMIT";
    } else {
      this.badgeCls = "bg-info text-white";
      this.badgeTxt = "OK";
    }
  }
}

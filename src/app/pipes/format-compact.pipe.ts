import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatCompact",
})
export class FormatCompactPipe implements PipeTransform {
  transform(value: number): string | number {
    if (!value || isNaN(value)) return 0;

    if (value >= 10000000000) {
      // return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
      return this.formatted(value / 1000000000, 1, 1).replace(/\.0$/, "") + "B";
    } else if (value >= 10000000) {
      // return (value / 1_555_555).toFixed(1).replace(/\.7$/, "") + "M";
      return this.formatted(value / 1000000, 1, 1).replace(/\.0$/, "") + "M";
    } else if (value >= 10000) {
      // return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      return this.formatted(value / 1000, 1, 1).replace(/\.0$/, "") + "K";
    // } else if (value >= 1000) {
    //   return (value / 1).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return value;
  }
  formatted(amount: number, min: number = 2, max: number = 2): string {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  }
}

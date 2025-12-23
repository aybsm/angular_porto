import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { CartsService } from "services/carts.service";

interface DailyChartModel {
  index: number;
  codes: string;
  values: number;
}

@Component({
  selector: "app-dashboard2",
  templateUrl: "./dashboard2.component.html",
  styleUrls: ["./dashboard2.component.scss"],
  providers: [CartsService],
})
export class Dashboard2Component implements OnInit {
  TotalRevenue: number = 0;
  NetRevenue: number = 0;
  TotalSavings: number = 0;
  TotalItemsSold: number = 0;

  dailyData: DailyChartModel[] = [
    { index: 0, codes: "Sun", values: 0 },
    { index: 1, codes: "Mon", values: 0 },
    { index: 2, codes: "Tue", values: 0 },
    { index: 3, codes: "Wed", values: 0 },
    { index: 4, codes: "Thu", values: 0 },
    { index: 5, codes: "Fri", values: 0 },
    { index: 6, codes: "Sat", values: 0 },
  ];
  constructor(private cartsservice: CartsService) {}
  formatted(amount: number, min: number = 2, max: number = 2): string {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  initDailySalesChart() {
    // let day = new Date().getDate();
    // let datadailyordered: DailyChartModel[] = [];
    // this.dailyData
    //   .filter((d) => d.index >= day)
    //   .forEach((d) => datadailyordered.push(d));
    // this.dailyData
    //   .filter((d) => d.index < day)
    //   .forEach((d) => datadailyordered.push(d));

    // console.log("Daily Data:", this.dailyData);
    // console.log("Daily Data Ordered:", datadailyordered);

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    let dataDailySalesChart: any = {
      // labels: ["M", "T", "W", "T", "F", "S", "S"],
      // series: [[12, 17, 7, 17, 23, 18, 38]],
      labels: this.dailyData.map((item) => item.codes),
      series: [this.dailyData.map((item) => item.values)],
      // labels: datadailyordered.map((item) => item.codes),
      // series: [datadailyordered.map((item) => item.values)],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      high: null,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 15 },
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);
  }
  initEmailsSubscriptionChart() {
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    var datawebsiteViewsChart = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [
        [
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
        ],
      ],
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#websiteViewsChart",
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  initCompletedTasksChart() {
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
    const dataCompletedTasksChart: any = {
      labels: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
      ],
      series: [
        [
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
          this.getRandomNumber(100, 1000),
        ],
      ],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }
  ngOnInit() {
    var data = this.cartsservice.getAllBy(25).subscribe((result) => {
      console.log("Carts total items:", result.total);
      this.TotalRevenue = result.carts.reduce(
        (accumulator, current) => accumulator + current.total,
        0
      );
      this.NetRevenue = result.carts.reduce(
        (accumulator, current) => accumulator + current.discountedTotal,
        0
      );
      this.TotalSavings = this.TotalRevenue - this.NetRevenue;
      this.TotalItemsSold = result.carts.reduce(
        (accumulator, current) => accumulator + current.totalQuantity,
        0
      );

      result.carts.forEach((cart) => {
        // let today = new Date();
        // let yesterday = new Date();
        // yesterday.setDate(today.getDate() - (cart.id - 1));
        // // let day = yesterday.getDay(); // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
        let day = this.getRandomNumber(0, 6);
        let daily = this.dailyData.find((d) => d.index === day);
        if (daily) {
          // daily.values += cart.totalProducts;
          daily.values += cart.total;
          // daily.values += 1;
        }
      });

      this.initDailySalesChart();
      this.initEmailsSubscriptionChart();
      this.initCompletedTasksChart();
    });
  }
}

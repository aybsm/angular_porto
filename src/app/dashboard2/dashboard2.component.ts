import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { data, get, map } from "jquery";
import { dirname } from "path";
import { CartModel, CartsService } from "services/carts.service";
import { ProductsService } from "services/products.service";
import { UserModel, UsersService } from "services/users.service";
import { forkJoin, of } from "rxjs";
import { time } from "console";

interface DailyChartModel {
  index: number;
  codes: string;
  values: number;
}

@Component({
  selector: "app-dashboard2",
  templateUrl: "./dashboard2.component.html",
  styleUrls: ["./dashboard2.component.scss"],
  providers: [CartsService, ProductsService, UsersService],
})
export class Dashboard2Component implements OnInit {
  Now = Date;
  TotalRevenue: number = 0;
  NetRevenue: number = 0;
  TotalSavings: number = 0;
  TotalItemsSold: number = 0;
  DiffPercSales: number = 0;

  UserShoppingSource: any = [];

  dailyData: DailyChartModel[] = [
    { index: 0, codes: "Su", values: 0 },
    { index: 1, codes: "Mo", values: 0 },
    { index: 2, codes: "Tu", values: 0 },
    { index: 3, codes: "We", values: 0 },
    { index: 4, codes: "Th", values: 0 },
    { index: 5, codes: "Fr", values: 0 },
    { index: 6, codes: "Sa", values: 0 },
  ];
  constructor(
    private cartsservice: CartsService,
    private productsservice: ProductsService,
    private usersservice: UsersService
  ) {}
  formatted(amount: number, min: number = 2, max: number = 2): string {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
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
    let day = new Date().getDay();
    let datadailyordered: DailyChartModel[] = [];
    this.dailyData
      .filter((d) => d.index > day)
      .forEach((d) => datadailyordered.push(d));
    this.dailyData
      .filter((d) => d.index <= day)
      .forEach((d) => datadailyordered.push(d));

    this.DiffPercSales =
      ((datadailyordered[6].values - datadailyordered[5].values) /
        datadailyordered[5].values) *
      100;

    // console.log("Daily Data:", this.dailyData);
    // console.log("Daily Data Ordered:", datadailyordered);

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    let dataDailySalesChart: any = {
      // labels: ["M", "T", "W", "T", "F", "S", "S"],
      // series: [[12, 17, 7, 17, 23, 18, 38]],
      // labels: this.dailyData.map((item) => item.codes),
      // series: [this.dailyData.map((item) => item.values)],
      labels: datadailyordered.map((item) => item.codes),
      series: [datadailyordered.map((item) => item.values)],
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
  initCategoryPerformanceChart(carts: CartModel[] = null) {
    // var datawebsiteViewsChart: { labels: string[]; series: number[][] } = null;
    // 1. Ambil data kategori dan produk secara bersamaan
    forkJoin({
      r_categories: this.productsservice.getCategories(),
      r_products: this.productsservice.get(),
    }).subscribe(({ r_categories, r_products }) => {
      // Ambil semua produk dari cart
      const products_cart = carts.flatMap((map) => map.products);

      // 2. Buat Map untuk mempercepat pencarian Kategori berdasarkan Slug
      const categoryMap = new Map(r_categories.map((c) => [c.slug, c.name]));

      // 3. Gabungkan data: Cari nama kategori untuk setiap produk di keranjang
      const productsWithCat = products_cart.map((cartItem) => {
        // Cari detail produk asli untuk mendapatkan slug kategorinya
        const originalProduct = r_products.products.find(
          (p) => p.id === cartItem.id
        );
        const categorySlug = originalProduct
          ? originalProduct.category
          : "unknown";

        return {
          categoryName: categoryMap.get(categorySlug) || "Unknown",
          quantity: cartItem.quantity,
        };
      });

      // 4. Grouping & Summing: Hitung total Qty per Kategori
      const categoryTotals = productsWithCat.reduce((acc, curr) => {
        acc[curr.categoryName] = (acc[curr.categoryName] || 0) + curr.quantity;
        return acc;
      }, {} as { [key: string]: number });

      // 5. Sorting & Limit: Ambil Top 5
      const topCategories = Object.entries(categoryTotals)
        .map(([name, totalQty]) => ({ name, totalQty }))
        .sort((a, b) => b.totalQty - a.totalQty) // Urutkan dari yang terbesar
        .slice(0, 15); // Ambil 5 teratas

      // console.log("Top 5 Categories:", top5Categories);
      // this.top5Data = top5Categories; // Simpan ke variabel untuk ditampilkan di UI
      var datacategoryPerformanceChart = {
        labels: topCategories.map((map) => map.name.substring(0, 3)),
        series: [topCategories.map((map) => map.totalQty)],
      };
      var optionscategoryPerformanceChart = {
        axisX: {
          showGrid: false,
        },
        low: 0,
        // high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
      };
      var responsiveOptions: any[] = [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                // return value[0];
                return value.length > 7 ? value.substring(0, 7) + ".." : value;
              },
            },
          },
        ],
      ];
      var categoryPerformanceChart = new Chartist.Bar(
        "#categoryPerformanceChart",
        datacategoryPerformanceChart,
        optionscategoryPerformanceChart,
        responsiveOptions
      );

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(categoryPerformanceChart);
    });

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    // var datawebsiteViewsChart = {
    //   labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    //   series: [
    //     [
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //       this.getRandomNumber(100, 1000),
    //     ],
    //   ],
    // };
    // var optionswebsiteViewsChart = {
    //   axisX: {
    //     showGrid: false,
    //   },
    //   low: 0,
    //   // high: 1000,
    //   chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    // };
    // var responsiveOptions: any[] = [
    //   [
    //     "screen and (max-width: 640px)",
    //     {
    //       seriesBarDistance: 5,
    //       axisX: {
    //         labelInterpolationFnc: function (value) {
    //           return value[0];
    //         },
    //       },
    //     },
    //   ],
    // ];
    // var websiteViewsChart = new Chartist.Bar(
    //   "#websiteViewsChart",
    //   datawebsiteViewsChart,
    //   optionswebsiteViewsChart,
    //   responsiveOptions
    // );

    // //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
  }
  initHourlyTransactionsChart(carts: CartModel[] = null) {
    var source = [
      { key: "0a", s: "00:00:00", e: "02:59:59" },
      { key: "3a", s: "03:00:00", e: "05:59:59" },
      { key: "6a", s: "06:00:00", e: "08:59:59" },
      { key: "9a", s: "09:00:00", e: "11:59:59" },
      { key: "12p", s: "12:00:00", e: "14:59:59" },
      { key: "3p", s: "15:00:00", e: "17:59:59" },
      { key: "6p", s: "18:00:00", e: "20:59:59" },
      { key: "9p", s: "21:00:00", e: "23:59:59" },
    ];
    const hourlyData = source.map((interval) => {
      // Hitung berapa banyak cart yang masuk dalam rentang waktu ini
      const count = carts.filter((cart) => {
        // Ambil string waktu (HH:mm:ss) dari date
        // Asumsi: cart.date adalah string ISO atau format Date yang valid
        const cartTime = new Date(cart.date).toTimeString().split(" ")[0];

        return cartTime >= interval.s && cartTime <= interval.e;
      }).length;

      return {
        key: interval.key,
        values: count,
      };
    });

    /* ----------==========     Category Performance Chart initialization    ==========---------- */
    const dataHourlyTransactionsChart: any = {
      labels: hourlyData.map((map) => map.key),
      series: [hourlyData.map((map) => map.values)],
    };

    const optionsHourlyTransactionsChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      // high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var hourlyTransactionsChart = new Chartist.Line(
      "#hourlyTransactionsChart",
      dataHourlyTransactionsChart,
      optionsHourlyTransactionsChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(hourlyTransactionsChart);
  }
  initTopCustomer(carts: CartModel[] = null) {
    forkJoin({
      j_users: this.usersservice.get(),
      j_carts: of(carts),
    }).subscribe(({ j_users, j_carts }) => {
      // const userShoppingReport = j_carts.map((cart) => {
      //   const user = j_users.users.find((u) => u.id === cart.userId);
      //   return {
      //     no: 0,
      //     name: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
      //     city: user ? user.address.city : "Unknown",
      //     country: user ? user.address.country : "Unknown",
      //     total: cart.discountedTotal,
      //     qty: cart.totalQuantity,
      //   };
      // });

      const user_grouped = carts.reduce((acc: Record<string, any>, cart) => {
        const user = j_users.users.find((u) => u.id === cart.userId);
        const name = user
          ? `${user.firstName} ${user.lastName}`
          : "Unknown User";

        if (!acc[name]) {
          acc[name] = {
            no: 0,
            name: name,
            city: user ? user.address.city : "Unknown",
            country: user ? user.address.country : "Unknown",
            total: 0,
            qty: 0,
            trx: 0,
          };
        }
        acc[name].total += cart.discountedTotal;
        acc[name].qty += cart.totalQuantity;
        acc[name].trx += 1;
        return acc;
      }, {});

      // console.log(userShoppingReport);
      const user_final = Object.values(user_grouped)
        .sort((x, z) => z.total - x.total)
        .slice(0, 5)
        .map((elmnt, index) => {
          elmnt.no = index + 1;
          return elmnt;
        });
      this.UserShoppingSource = user_final;
    });
  }
  ngOnInit() {
    var data = this.cartsservice.getAllBy(25).subscribe((result) => {
      // console.log("Carts total items:", result.total);
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
        // let day = this.getRandomNumber(0, 6);
        // let daily = this.dailyData.find((d) => d.index === day);
        // if (daily) {
        //   // daily.values += cart.totalProducts;
        //   daily.values += cart.total;
        //   // daily.values += 1;
        // }

        const now = new Date();
        const last30Days = new Date();
        last30Days.setDate(now.getDate() - 30);
        cart.date = this.getRandomDate(last30Days, now);
        // console.log(`Cart ID: ${cart.id}, Date: ${cart.date}`);
        let daily = this.dailyData.find((d) => d.index === cart.date.getDay());
        if (daily) {
          daily.values += cart.total;
        }
      });

      this.initDailySalesChart();
      this.initCategoryPerformanceChart(result.carts);
      this.initHourlyTransactionsChart(result.carts);
      this.initTopCustomer(result.carts);
    });
  }
}

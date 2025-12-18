import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"],
})
export class StarRatingComponent implements OnInit {
  @Input() ratingValue: number = 0;
  @Input() ratingTxt: string;

  starIcons: string[] = [];
  maxRating: number = 5;

  constructor() {}

  ngOnInit(): void {
    if (this.ratingValue === null || this.ratingValue === undefined) {
      this.ratingValue = 0;
    }
    this.calculateStars();
  }
  customizeRating(e: any) {
    // Cek di Console apakah ini terpanggil

    // Pastikan class ditambahkan
    // if (e.element) {
    //   // console.log("Customizing Rating for value:", this.ratingValue);
    //   // e.element.classList.add("rating-control");
    //   // console.log("Customizing Rating Element:", e.element.classList);
    // }
  }

  // Metode yang menghitung jenis bintang berdasarkan rating
  calculateStars(): void {
    this.starIcons = [];
    // const rating = Math.round(this.ratingValue * 2) / 2; // Pembulatan ke 0.5 terdekat

    let i = 1;
    while (i <= this.maxRating) {
      // if (rating >= i) {
      //   // Bintang Penuh (nilai rating lebih besar atau sama dengan index bintang)
      //   this.starIcons.push("star");
      // } else if (rating === i - 0.5) {
      //   // Bintang Setengah (nilai rating sama persis dengan index bintang dikurangi 0.5)
      //   this.starIcons.push("star_half");
      // } else {
      //   // Bintang Kosong (jika belum terisi penuh atau setengah)
      //   this.starIcons.push("star_border");
      // }
      const threshold = this.ratingValue - (i - 1);
      if (threshold >= 1) {
        this.starIcons.push("star");
      } else if (threshold >= 0) {
        this.starIcons.push("star_half");
      // } else {
      //   this.starIcons.push("star_border");
      } 
      i++;
    }
  }
}

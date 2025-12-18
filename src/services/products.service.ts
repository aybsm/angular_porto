import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface ProductModel {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
}

// @Injectable({
//   // Jika providedIn: 'root': Service akan dimuat di bundle utama (main.js). Artinya, kode service akan diunduh bahkan jika pengguna belum pernah mengunjungi halaman Produk.
//   // Jika Dimasukkan ke ProductsModule: Kode service hanya akan diunduh dan disediakan ke injector Angular saat ProductsModule dimuat (yaitu, ketika pengguna menavigasi ke /products). Ini mengurangi ukuran bundle awal aplikasi dan mempercepat waktu startup awal.

//   providedIn: "root",
// })
@Injectable()
export class ProductsService {
  private apiUrl =
    `${environment.dummyjson.baseurl}/products?limit=25&skip=&select=id,sku,title,category,price,rating,stock,minimumOrderQuantity,brand`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ products: ProductModel[]; total: number }> {
    return this.http.get<{ products: ProductModel[]; total: number }>(
      this.apiUrl
    );
  }
  // get(): Observable<ProductModel[]> {
  //   return this.http.get<ProductModel[]>(this.apiUrl);
  // }
}

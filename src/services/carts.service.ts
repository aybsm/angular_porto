import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface CartModel {
  id: number;
  totalProducts:number;
  totalQuantity:number;
  discountedTotal:number;
  total:number;
  products:ProductModel[];
}
export interface ProductModel {
  id: number;
  title: string;
  price: number;
  quantity:number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

@Injectable()
export class CartsService {
  private apiUrl =
    `${environment.dummyjson.baseurl}/carts?limit=25&skip=&select=id,totalProducts,totalQuantity,discountedTotal,total,products`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ carts: CartModel[]; total: number }> {
    return this.http.get<{ carts: CartModel[]; total: number }>(
      this.apiUrl
    );
  }
}

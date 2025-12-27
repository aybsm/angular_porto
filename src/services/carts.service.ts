import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import { environment } from "../environments/environment";

export interface CartModel {
  id: number;
  date: Date;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
  total: number;
  products: ProductModel[];
}
export interface ProductModel {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

@Injectable()
export class CartsService {
  private apiUrl =
    environment.production && false
      ? `${environment.dummyjson.baseurl}/carts?limit=25&skip=&select=id,totalProducts,totalQuantity,discountedTotal,total,products`
      : `${environment.dummyjson.baseurl}/carts.json`;
  private apiUrlByLimit =
    environment.production && false
      ? `${environment.dummyjson.baseurl}/carts?limit={{limit}}&skip={{skip}}`
      : `${environment.dummyjson.baseurl}/carts.json`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ carts: CartModel[]; total: number }> {
    return this.http.get<{ carts: CartModel[]; total: number }>(this.apiUrl);
  }
  getAllBy(limit: number): Observable<{ carts: CartModel[]; total: number }> {
    return this.http.get<any>(this.getUrl(limit, 0)).pipe(
      switchMap((firstResponse) => {
        const total = firstResponse.total;
        const xlimit = firstResponse.limit;
        const firstPageCarts = firstResponse.carts;

        if (total <= xlimit) {
          return of({ carts: firstPageCarts, total: total });
        }

        const remainingRequests: Observable<any>[] = [];
        for (let skip = xlimit; skip < total; skip += xlimit) {
          remainingRequests.push(this.http.get<any>(this.getUrl(xlimit, skip)));
        }

        return forkJoin(remainingRequests).pipe(
          map((responses) => {
            const otherCarts = responses.reduce(
              (acc, curr) => acc.concat(curr.carts),
              []
            );
            return {
              carts: [...firstPageCarts, ...otherCarts],
              total: total,
            };
          })
        );
      })
    );
  }
  private getUrl(limit: number, skip: number): string {
    return this.apiUrlByLimit
      .replace("{{limit}}", limit.toString())
      .replace("{{skip}}", skip.toString());
  }
}

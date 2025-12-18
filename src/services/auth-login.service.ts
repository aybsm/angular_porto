import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface AuthLoginModel {
  id: number;
  totalProducts:number;
  totalQuantity:number;
  discountedTotal:number;
  total:number;
}

@Injectable()
export class AuthLoginService {
  private apiUrl =
    `${environment.dummyjson.baseurl}/auth/login`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ carts: AuthLoginModel[]; total: number }> {
    return this.http.get<{ carts: AuthLoginModel[]; total: number }>(
      this.apiUrl
    );
  }
}

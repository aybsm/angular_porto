import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface UserModel {
  id: number;
  totalProducts:number;
  totalQuantity:number;
  discountedTotal:number;
  total:number;
}

@Injectable()
export class UsersService {
  private apiUrl =
    `${environment.dummyjson.baseurl}/users?limit=25`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ carts: UserModel[]; total: number }> {
    return this.http.get<{ carts: UserModel[]; total: number }>(
      this.apiUrl
    );
  }
}

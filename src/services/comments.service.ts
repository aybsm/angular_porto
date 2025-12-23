import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface CommentModel {
  id: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
  total: number;
}

@Injectable()
export class CommentsService {
  private apiUrl = environment.production && false
    ? `${environment.dummyjson.baseurl}/comments?limit=25&skip=&select=id,body,postId,likes,user`
    : `${environment.dummyjson.baseurl}/comments.json`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ carts: CommentModel[]; total: number }> {
    return this.http.get<{ carts: CommentModel[]; total: number }>(this.apiUrl);
  }
}

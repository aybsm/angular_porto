import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface PostModel {
  id: number;
  title: string;
  views: number;
  reactions: ReactionModel;
  tags: string[];
  body: string;
}
export interface ReactionModel {
  likes: number;
  dislikes: number;
}

@Injectable()
export class PostsService {
  private apiUrl = `${environment.dummyjson.baseurl}/posts?limit=25&skip=&select=id,title,views,reactions,tags,body`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ posts: PostModel[]; total: number }> {
    return this.http.get<{ posts: PostModel[]; total: number }>(this.apiUrl);
  }
}

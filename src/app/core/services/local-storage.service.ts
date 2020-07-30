import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private FILMS_HISTORY: string = "films_history";
  private POSTS_HISTORY: string = "posts_history";

  constructor() { }

  storeFilmsHistory(queryParam: Params): void {
    sessionStorage.setItem(this.FILMS_HISTORY, JSON.stringify(queryParam));
  }

  getFilmsHistory(): Params {
    return JSON.parse(sessionStorage.getItem(this.FILMS_HISTORY));
  }

  clearFilmsHistory():void {
    sessionStorage.removeItem(this.FILMS_HISTORY);
  }

  storePostsHistory(queryParam: Params): void {
    sessionStorage.setItem(this.POSTS_HISTORY, JSON.stringify(queryParam));
  }

  getPostsHistory(): Params {
    return JSON.parse(sessionStorage.getItem(this.POSTS_HISTORY));
  }

  clearPostsHistory(): void {
    sessionStorage.removeItem(this.POSTS_HISTORY);
  }
}

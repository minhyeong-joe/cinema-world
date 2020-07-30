import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private FILM_PARAMS: string = "film_params";
  private POST_PARAMS: string = "post_params";

  constructor() { }

  saveFilmParams(queryParam: Params): void {
    sessionStorage.setItem(this.FILM_PARAMS, JSON.stringify(queryParam));
  }

  getFilmParams(): Params {
    return JSON.parse(sessionStorage.getItem(this.FILM_PARAMS));
  }

  clearFilmParams():void {
    sessionStorage.removeItem(this.FILM_PARAMS);
  }

  savePostParams(queryParam: Params): void {
    sessionStorage.setItem(this.POST_PARAMS, JSON.stringify(queryParam));
  }

  getPostParams(): Params {
    return JSON.parse(sessionStorage.getItem(this.POST_PARAMS));
  }

  clearPostParams(): void {
    sessionStorage.removeItem(this.POST_PARAMS);
  }
}

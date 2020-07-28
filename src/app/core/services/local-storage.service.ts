import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private FILMS_HISTORY: string = "films_history";

  constructor() { }

  storeFilmsHistory(query: string | number, page: number, by: string): void {
    let history = {
      page: page
    };
    switch (by) {
      case "year":
        history['year'] = query;
        break;
      case "title":
        history['title'] = query;
        break;
      case "director":
        history['director'] = query;
        break;
    }
    sessionStorage.setItem(this.FILMS_HISTORY, JSON.stringify(history));
  }

  getFilmsHistory() {
    return JSON.parse(sessionStorage.getItem(this.FILMS_HISTORY));
  }

  clearFilmsHistory() {
    sessionStorage.removeItem(this.FILMS_HISTORY);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  API_ENDPOINT: string = `${environment.ROOT_URI}/api/films`;

  constructor(private http: HttpClient) { }

  // Get a film by ID
  // GET api/films/:id
  getFilmById(id: String):Observable<{success:Boolean, films:Film} | {success:Boolean, message:String}> {
    return this.http.get<{success:Boolean, films:Film} | {success:Boolean, message:String}>(`${this.API_ENDPOINT}/${id}`);
  }

  // Get films by title
  // GET api/films/title?title=:title&lim=:lim&page=:page
  getFilmsByTitle(title: String, lim: Number, page: Number):Observable<{success:Boolean, films:Film[]} | {success:Boolean, message:String}> {
    return this.http.get<{success:Boolean, films:Film[]} | {success:Boolean, message:String}>(`${this.API_ENDPOINT}/title?title=${title}&lim=${lim}&page=${page}`);
  }

  // Get films by year
  // GET api/films/year?year=:year&lim=:lim&page=:page
  getFilmsByYear(year: Number, lim: Number, page: Number):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/year?year=${year}&lim${lim}&page=${page}`);
  }
}

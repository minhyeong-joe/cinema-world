import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  API_ENDPOINT: string = "http://localhost/api/films";

  constructor(private http: HttpClient) { }

  // Get a film by ID
  // GET api/films/:id
  getFilmById(id: String):Observable<{success:Boolean, films:Film} | {success:Boolean, message:String}> {
    return this.http.get<{success:Boolean, films:Film} | {success:Boolean, message:String}>(`${this.API_ENDPOINT}/${id}`);
  }

  // Get films by title
  // GET api/films/title?title=:title&lim=:lim&page=:page
  getFilmByTitle(title: String, lim: Number, page: Number):Observable<{success:Boolean, films:Film[]} | {success:Boolean, message:String}> {
    return this.http.get<{success:Boolean, films:Film[]} | {success:Boolean, message:String}>(`${this.API_ENDPOINT}/title?title=${title}&lim=${lim}&page=${page}`);
  }
}

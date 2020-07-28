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
  getFilmsByTitle(title: String, lim: Number, page: Number):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/title?title=${title}&lim=${lim}&page=${page}`);
  }

  // Get films by year
  // GET api/films/year?year=:year&lim=:lim&page=:page
  getFilmsByYear(year: Number, lim: Number, page: Number):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/year?year=${year}&lim=${lim}&page=${page}`);
  }

  // Get films by director
  // GET api/films/director?director=:director&lim=:lim&page=:page
  getFilmsByDirector(director:string, lim: number, page: number):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/director?director=${director}&lim=${lim}&page=${page}`);
  }

  // Get total count of films by title
  // GET api/films/title-count/:title
  getCountByTitle(title: string):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/title-count/${title}`);
  }

  // Get total count of films by year
  // GET api/films/year-count/:year
  getCountByYear(year: number):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/year-count/${year}`);
  }

  // Get total count of films by director
  // GET api/films/director-count/:director
  getCountByDirector(director: string):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/director-count/${director}`);
  }

  // get previous film
  getPrevious(query: any, id: string, by: string):Observable<any> {
    switch (by) {
      case "year":
        return this.http.get<any>(`${this.API_ENDPOINT}/year-prev/${query}/${id}`);
      case "title":
        return this.http.get<any>(`${this.API_ENDPOINT}/title-prev/${query}/${id}`);
      case "director":
        return this.http.get<any>(`${this.API_ENDPOINT}/director-prev/${query}/${id}`);
    }
  }

  // get next film
  getNext(query: number | string, id: string, by: string):Observable<any> {
    switch (by) {
      case "year":
        return this.http.get<any>(`${this.API_ENDPOINT}/year-next/${query}/${id}`);
      case "title":
        return this.http.get<any>(`${this.API_ENDPOINT}/title-next/${query}/${id}`);
      case "director":
        return this.http.get<any>(`${this.API_ENDPOINT}/director-next/${query}/${id}`);
    }
  }
}

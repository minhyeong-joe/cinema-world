import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  API_ENDPOINT: string = `${environment.ROOT_URI}/api/posts`;

  constructor(private http: HttpClient) { }

  // Get all posts
  // GET api/posts/?lim=:lim&page=:page
  getAllPosts(lim: number, page: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('lim', lim.toString()).append('page', page.toString());
    return this.http.get<any>(`${this.API_ENDPOINT}`, {params: params});
  }

  // Get count of all posts
  // GET api/posts/all-count
  getCount(): Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/all-count`);
  }

  // Get posts by Tags
  // GET api/posts/tag/?lim=:lim&page=:page&tag=:tagId&tag=:tagId...
  getByTags(tagIds: string[], lim: number, page: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('lim', lim.toString()).append('page', page.toString());
    for (let id of tagIds) {
      params = params.append('tag', id);
    }
    return this.http.get<any>(`${this.API_ENDPOINT}/tag`, {params: params});
  }

  // get count of posts by tags
  // GET api/posts/tag-count/?tag=:tagId&tag=:tagId
  getCountByTags(tagIds: string[]): Observable<any> {
    let params = new HttpParams();
    for (let id of tagIds) {
      params = params.append('tag', id);
    }
    return this.http.get<any>(`${this.API_ENDPOINT}/tag-count`, {params: params});
  }

  // get posts by Title
  // GET api/posts/title/?lim=:lim&page=:page&title=:title
  getByTitle(query: string, lim:number, page: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('lim', lim.toString()).append('page', page.toString());
    params = params.append('title', query);
    return this.http.get<any>(`${this.API_ENDPOINT}/title`, {params: params});
  }

  // get count of posts by title
  // GET api/posts/title-count/:title
  getCountByTitle(query: string):Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/title-count/${query}`);
  }

  // get a post by id
  // GET api/posts/:id
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}/${id}`);
  }
}

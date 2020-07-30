import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  API_ENDPOINT: string = `${environment.ROOT_URI}/api/tags`;

  constructor(private http: HttpClient) { }

  // Get all tags
  // GET api/tags
  getAllTags(): Observable<any> {
    return this.http.get<any>(`${this.API_ENDPOINT}`);
  }
}

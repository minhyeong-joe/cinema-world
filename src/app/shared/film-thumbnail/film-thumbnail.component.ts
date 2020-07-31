import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Params } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'film-thumbnail',
  templateUrl: './film-thumbnail.component.html',
  styleUrls: ['./film-thumbnail.component.scss']
})
export class FilmThumbnailComponent implements OnInit {
  @Input('src') public src: string;
  @Input('alt') public alt: string = "Image not found";
  @Input('loader') public loaderSrc: string;
  @Input('id') public id: string;
  @Input('title') public title: string;
  @Input('director') public director: string;
  @Input('year') public year: string;
  @Input('queryParams') public queryParams: Params;

  public isLoading: boolean = true;

  constructor(private session: SessionStorageService) { }

  ngOnInit(): void {
  }

  onLoad() {
    this.isLoading = false;
    console.log("loaded");

  }

  onClick() {
    if (this.queryParams != null) {
      this.session.saveFilmParams(this.queryParams);
    }
  }
}

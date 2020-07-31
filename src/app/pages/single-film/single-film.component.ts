import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
declare var lightGallery: any;

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss']
})
export class SingleFilmComponent implements OnInit, OnDestroy {
  private getIdSub: Subscription;
  private getFilmSub: Subscription;

  public film: Film;
  public prevId: string;
  public nextId: string;

  public backUrl: string = '/films';
  public queryParams: Params;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute,
              private session: SessionStorageService) { }

  ngOnInit(): void {
    this.queryParams = this.session.getFilmParams();
    if (this.queryParams == null) {
      this.backUrl = '/';
    }
    // get ID from path
    this.getIdSub = this.route.params.subscribe(params => {
      const id = params['id'];
      // find prev & next films
      const session = this.session.getFilmParams();
      if (session) {
        const query = session['year'] || session['title'] || session['director'];
        const by = session['year'] != null? "year" : (session['title'] != null? "title" : "director");
        this.filmService.getPrevious(query, id, by)
        .subscribe(res => {
          if (res.success) {
            this.prevId = res.prev;
          }
        });
        this.filmService.getNext(query, id, by)
        .subscribe(res => {
          if (res.success) {
            this.nextId = res.next;
          }
        });
      }

      // load film by id
      this.getFilmSub = this.filmService.getFilmById(id)
      .subscribe((res:any) => {
        if (res.success) {
          this.film = res.film;
        }
        // initialize light gallery
        // using setTimeout 0, let Angular creates view first before initializing light gallery.
        setTimeout( () => {
          lightGallery(document.getElementById('lightgallery'), {
            thumbnail: true,
            showThumbByDefault: true,
            zoom: true,
            fullScreen: true,
            });
         },0)
        });

      });
  }

  ngOnDestroy(): void {
    this.getIdSub.unsubscribe();
    this.getFilmSub.unsubscribe();
    this.session.clearFilmParams();
  }

}

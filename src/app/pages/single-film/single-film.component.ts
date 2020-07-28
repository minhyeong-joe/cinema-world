import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
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
  public youtube_url: string;
  public history: Object;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get ID from path
    this.getIdSub = this.route.params.subscribe(params => {
      const id = params['id'];
      // load film by id
      this.getFilmSub = this.filmService.getFilmById(id)
      .subscribe((res:any) => {
        if (res.success) {
          this.film = res.film;
          this.youtube_url = "https://www.youtube-nocookie.com/embed/" + this.film.youtube_trailer_id;
        }
        console.log(this.film);
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
  }

}

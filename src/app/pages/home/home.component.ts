import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private getFilmsSub: Subscription;
  latestFilms: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    // get first 4 movies of all movies (internally sorted by release_date desc)
    this.getFilmsSub = this.filmService.getFilmsByTitle("", 4, 1)
      .subscribe((res: any) => {
        if (res.success) {
          this.latestFilms = res.data.films;
        }
      });
  }

  ngOnDestroy() {
    this.getFilmsSub.unsubscribe();
  }

}

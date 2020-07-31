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
  public latestFilms: Film[];
  public cols: number;
  public dimLg: number;
  public rowMd: number;
  public dimSm: number;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    // get first 4 movies of all movies (internally sorted by release_date desc)
    this.getFilmsSub = this.filmService.getFilmsByTitle("", 4, 1)
      .subscribe((res: any) => {
        if (res.success) {
          this.latestFilms = res.data.films;
        }
      });
    if (window.innerWidth >= 992) {
      this.cols = 4;
      this.dimLg = 2;
      this.rowMd = 1;
      this.dimSm = 1;
    } else if (window.innerWidth >= 576) {
      this.cols = 2;
      this.dimLg = 1;
      this.rowMd = 1;
      this.dimSm = 1;
    } else {
      this.cols = 1;
      this.dimLg = 1;
      this.rowMd = 1;
      this.dimSm = 1;
    }
  }

  onResize(event) {
    if (event.target.innerWidth >= 992) {
      this.cols = 4;
      this.dimLg = 2;
      this.rowMd = 1;
      this.dimSm = 1;
    } else if (event.target.innerWidth >= 576) {
      this.cols = 2;
      this.dimLg = 1;
      this.rowMd = 1;
      this.dimSm = 1;
    } else {
      this.cols = 1;
      this.dimLg = 1;
      this.rowMd = 1;
      this.dimSm = 1;
    }
  }

  ngOnDestroy() {
    this.getFilmsSub.unsubscribe();
  }

}

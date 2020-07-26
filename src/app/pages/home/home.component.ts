import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestFilms: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    // get first 4 movies of all movies (internally sorted by release_date desc)
    this.filmService.getFilmByTitle("", 4, 1)
      .subscribe((films: any) => {
        this.latestFilms = films.films;
        console.log(this.latestFilms);
      });
  }

}

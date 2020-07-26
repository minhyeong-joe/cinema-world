import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Film } from 'src/app/core/models/film';

const FROM_YEAR: Number = 2000;

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  public selectedYear: Number;
  public years: Number[];
  public currentPage: Number;
  public totalPage: Number;
  public films: Film[]

  private getFilmsSub: Subscription;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let y = currentYear; y >= FROM_YEAR; y--) {
      this.years.push(y);
    }
    this.selectedYear = currentYear;
    this.currentPage = 1;
    this.getFilmsSub = this.filmService.getFilmsByYear(this.selectedYear, 20, this.currentPage)
    .subscribe(res => {
      this.films = res.films;
      console.log(this.films);
    });
  }

  onYearSelect(event: MatTabChangeEvent) {
    this.selectedYear = parseInt(event.tab.textLabel);
    this.currentPage = 1;
    this.getFilmsSub = this.filmService.getFilmsByYear(this.selectedYear, 20, this.currentPage)
    .subscribe(res => {
      this.films = res.films;
      console.log(this.films);
    });
  }

}

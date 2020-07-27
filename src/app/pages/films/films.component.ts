import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageEvent } from '@angular/material/paginator';

import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';

const FROM_YEAR: number = 2000;
const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  public selectedYear: number;
  public years: number[];
  public pageEvent: PageEvent;
  public films: Film[];
  public isByYear: boolean;
  public searchForm = this.fb.group({
    searchBy: ['title', Validators.pattern(/title|director/)],
    query: ['', [Validators.required, Validators.minLength(3)]]
  });

  private getFilmsSub: Subscription;
  private getCountSub: Subscription;

  constructor(private filmService: FilmService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
    this.isByYear = true;
    // initialize year list from current year -> 2000 (const FROM_YEAR)
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let y = currentYear; y >= FROM_YEAR; y--) {
      this.years.push(y);
    }
    this.selectedYear = currentYear;
    // pagination initialize
    this.resetPagination();
    // initialize first list with current year
    this.renderList();
  }

  onYearSelect(event: MatTabChangeEvent) {
    this.selectedYear = parseInt(event.tab.textLabel);
    this.resetPagination();
    this.renderList();
  }

  onSearch() {
    this.isByYear = false;
    this.resetPagination();
    this.renderList();
  }

  onSearchByYearClick() {
    this.isByYear = true;
    this.searchForm.reset({
      searchBy: 'title',
      query: ''
    });
    this.selectedYear = this.years[0];
    this.resetPagination();
    this.renderList();
  }


  onPageChange(event:PageEvent) {
    this.pageEvent = event;
    this.renderList();
  }

  resetPagination() {
    if (this.isByYear) {
      this.getCountSub = this.filmService.getCountByYear(this.selectedYear)
        .subscribe(res => {
          if (res.success) {
            this.pageEvent.pageIndex = 0;
            this.pageEvent.pageSize = PAGE_SIZE;
            this.pageEvent.length = res.count;
          }
        });
    } else {
      const searchBy:string = this.searchForm.get('searchBy').value;
      const query:string = this.searchForm.get('query').value;
      switch (searchBy) {
        case "title":
          this.getFilmsSub = this.filmService.getCountByTitle(query)
          .subscribe(res => {
            if (res.success) {
              this.pageEvent.pageIndex = 0;
              this.pageEvent.pageSize = PAGE_SIZE;
              this.pageEvent.length = res.count;
            }
          })
          break;
        case "director":
          this.getFilmsSub = this.filmService.getCountByDirector(query)
          .subscribe(res => {
            if (res.success) {
              this.pageEvent.pageIndex = 0;
              this.pageEvent.pageSize = PAGE_SIZE;
              this.pageEvent.length = res.count;
            }
          })
          break;
      }
    }
  }

  renderList() {
    if (this.isByYear) {
      this.getFilmsSub = this.filmService.getFilmsByYear(this.selectedYear, PAGE_SIZE, this.pageEvent.pageIndex+1)
      .subscribe(res => {
        if (res.success) {
          this.films = res.films;
        }
      });
    } else {
      const searchBy:string = this.searchForm.get('searchBy').value;
      const query:string = this.searchForm.get('query').value;
      switch (searchBy) {
        case "title":
          this.getFilmsSub = this.filmService.getFilmsByTitle(query, PAGE_SIZE, this.pageEvent.pageIndex+1)
          .subscribe(res => {
            if (res.success) {
              this.films = res.films;
            }
          })
          break;
        case "director":
          this.getFilmsSub = this.filmService.getFilmsByDirector(query, PAGE_SIZE, this.pageEvent.pageIndex+1)
          .subscribe(res => {
            if (res.success) {
              this.films = res.films;
            }
          })
          break;
      }
    }
  }

  ngOnDestroy():void {
    this.getFilmsSub.unsubscribe();
    this.getCountSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageEvent } from '@angular/material/paginator';

import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

const FROM_YEAR: number = 2000;
const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  public selectedYear: number;
  public selectedTabIndex: number;
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

  constructor(private filmService: FilmService,
              private fb: FormBuilder,
              private session: LocalStorageService) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
    // initialize year list from current year -> 2000 (const FROM_YEAR)
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let y = currentYear; y >= FROM_YEAR; y--) {
      this.years.push(y);
    }
    // if coming from single page, use session, else use default (latest film first by year)
    const session = this.session.getFilmsHistory();
    if (session) {
      if (session['year'] != null) {
        this.isByYear = true;
        this.selectedYear = session['year'];
        this.selectedTabIndex = this.years.indexOf(session['year']);
      } else if (session['title'] != null) {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('title');
        this.searchForm.get('query').setValue(session['title']);
        this.selectedYear = currentYear;
        this.selectedTabIndex = 0;
      } else {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('director');
        this.searchForm.get('query').setValue(session['director']);
        this.selectedYear = currentYear;
        this.selectedTabIndex = 0;
      }
      this.pageEvent.pageIndex = session['page']-1;
      this.session.clearFilmsHistory();
    }
    else {
      this.isByYear = true;
      this.selectedYear = currentYear;
      this.selectedTabIndex = 0;
    }
    // pagination initialize
    this.resetPagination();
    // initialize first list with current year
    this.renderList();
  }

  onClickFilm() {
    let query: number | string;
    let by: string;
    if (this.isByYear) {
      query = this.selectedYear;
      by = "year";
    } else {
      query = this.searchForm.get('query').value;
      by = this.searchForm.get('searchBy').value;
    }
    this.session.storeFilmsHistory(query, this.pageEvent.pageIndex+1, by);
  }

  onYearSelect(event: MatTabChangeEvent) {
    this.selectedYear = parseInt(event.tab.textLabel);
    this.selectedTabIndex = event.index;
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
    this.selectedYear = this.years[this.selectedTabIndex];
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
          this.getCountSub = this.filmService.getCountByTitle(query)
          .subscribe(res => {
            if (res.success) {
              this.pageEvent.pageIndex = 0;
              this.pageEvent.pageSize = PAGE_SIZE;
              this.pageEvent.length = res.count;
            }
          })
          break;
        case "director":
          this.getCountSub = this.filmService.getCountByDirector(query)
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

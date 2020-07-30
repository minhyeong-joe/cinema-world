import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageEvent } from '@angular/material/paginator';

import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

const FROM_YEAR: number = 2000;
const PAGE_SIZE: number = 4;

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
    query: ['', [Validators.required]]
  });

  private getFilmsSub: Subscription;
  private getCountSub: Subscription;

  public queryParams: Params;

  constructor(private filmService: FilmService,
              private fb: FormBuilder,
              private session: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
    // initialize year list from current year -> 2000 (const FROM_YEAR)
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let y = currentYear; y >= FROM_YEAR; y--) {
      this.years.push(y);
    }

    // render list based on query params
    this.route.queryParams.subscribe(param => {
      if (Object.keys(param).length == 0) {
        // default page without params -> page 1 of latest
        this.queryParams = {
          page: 1,
          year: currentYear
        };
      } else {
        this.queryParams = param;
      }
      console.log(this.queryParams);
      // use query params to render list
      if (this.queryParams['year'] != null) {
        this.isByYear = true;
        this.selectedYear = parseInt(this.queryParams['year']);
        this.selectedTabIndex = this.years.indexOf(this.selectedYear);
      } else if (this.queryParams['title'] != null) {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('title');
        this.searchForm.get('query').setValue(this.queryParams['title']);
        this.selectedYear = currentYear;
        this.selectedTabIndex = 0;
      } else {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('director');
        this.searchForm.get('query').setValue(this.queryParams['director']);
        this.selectedYear = currentYear;
        this.selectedTabIndex = 0;
      }
      this.pageEvent.pageIndex = this.queryParams['page']-1;
      console.log(this.pageEvent);

      // pagination initialize
      this.resetPagination();
      // initialize first list with current year
      this.renderList();
    })


    // if coming from single page, use session, else use default (latest film first by year)
    const session = this.session.getFilmsHistory();

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
    this.session.storeFilmsHistory(this.queryParams);
  }

  onYearSelect(event: MatTabChangeEvent) {
    this.selectedYear = parseInt(event.tab.textLabel);
    this.router.navigate(['/films'], {queryParams: {
      page: 1,
      year: this.selectedYear
    }});
  }

  onSearch() {
    this.isByYear = false;
    this.router.navigate(['/films'], {queryParams: {
      page: 1,
      title: this.searchForm.get('searchBy').value == "title"? this.searchForm.get('query').value : null,
      director: this.searchForm.get('searchBy').value == "director"? this.searchForm.get('query').value : null
    }})
  }

  onSearchByYearClick() {
    this.isByYear = true;
    this.searchForm.reset({
      searchBy: 'title',
      query: ''
    });
    this.router.navigate(['/films'], {queryParams: {
      page: 1,
      year: this.selectedYear
    }})
  }

  onPageChange(event:PageEvent) {
    this.pageEvent = event;
    console.log(this.pageEvent.pageIndex);
    this.router.navigate(['/films'], {queryParams: {
      page: this.pageEvent.pageIndex+1,
      year: this.queryParams['year'] || null,
      title: this.queryParams['title'] || null,
      director: this.queryParams['director'] || null
    }});
    // this.renderList();
  }

  resetPagination() {
    if (this.isByYear) {
      this.getCountSub = this.filmService.getCountByYear(this.selectedYear)
        .subscribe(res => {
          if (res.success) {
            // this.pageEvent.pageIndex = 0;
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
              // this.pageEvent.pageIndex = 0;
              this.pageEvent.pageSize = PAGE_SIZE;
              this.pageEvent.length = res.count;
            }
          })
          break;
        case "director":
          this.getCountSub = this.filmService.getCountByDirector(query)
          .subscribe(res => {
            if (res.success) {
              // this.pageEvent.pageIndex = 0;
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

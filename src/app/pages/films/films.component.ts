import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageEvent } from '@angular/material/paginator';

import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

const FROM_YEAR: number = 2000;
const PAGE_SIZE: number = 4;

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  public selectedTabIndex: number;
  public years: number[] = [];
  public pageEvent: PageEvent = new PageEvent();
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
              private session: SessionStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // initialize year list from current year -> 2000 (const FROM_YEAR)
    const currentYear = new Date().getFullYear();
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
      // get current page
      this.pageEvent.pageIndex = this.queryParams['page']-1;
      // use query params to render list
      if (this.queryParams['year'] != null) {
        this.isByYear = true;
        this.selectedTabIndex = this.years.indexOf(parseInt(this.queryParams['year']));
      } else if (this.queryParams['title'] != null) {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('title');
        this.searchForm.get('query').setValue(this.queryParams['title']);
      } else {
        this.isByYear = false;
        this.searchForm.get('searchBy').setValue('director');
        this.searchForm.get('query').setValue(this.queryParams['director']);
      }
      // pagination initialize
      this.resetPagination();
      // render list based on the query
      this.renderList();
    });
  }

  onClickFilm() {
    this.session.saveFilmParams(this.queryParams);
  }

  onYearSelect(event: MatTabChangeEvent) {
    this.router.navigate(['/films'], {queryParams: {
      page: 1,
      year: this.years[event.index]
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
      year: this.years[this.selectedTabIndex]
    }})
  }

  onPageChange(event:PageEvent) {
    this.router.navigate(['/films'], {queryParams: {
      page: event.pageIndex+1,
      year: this.queryParams['year'] || null,
      title: this.queryParams['title'] || null,
      director: this.queryParams['director'] || null
    }});
  }

  resetPagination() {
    if (this.isByYear) {
      const year = this.years[this.selectedTabIndex];
      console.log(year);

      this.getCountSub = this.filmService.getCountByYear(year)
        .subscribe(res => {
          if (res.success) {
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
              this.pageEvent.pageSize = PAGE_SIZE;
              this.pageEvent.length = res.count;
            }
          })
          break;
        case "director":
          this.getCountSub = this.filmService.getCountByDirector(query)
          .subscribe(res => {
            if (res.success) {
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
      const year = this.years[this.selectedTabIndex];
      this.getFilmsSub = this.filmService.getFilmsByYear(year, PAGE_SIZE, this.pageEvent.pageIndex+1)
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

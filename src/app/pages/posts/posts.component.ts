import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { TagsDialogComponent } from './tags-dialog.component';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/core/services/tag.service';
import { Post } from 'src/app/core/models/post';
import { Tag } from 'src/app/core/models/tag';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

// posts per page
const PAGE_SIZE = 5;
// max number of pages in one pagination group
const MAX_PAGINATION = 10;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public MAX_PAGINATION = MAX_PAGINATION;
  // posts to display on view
  public posts: Post[];

  // tag/topic filter logic
  public allTags: Tag[] = [];
  public selectedTags: Tag[] = [];

  // pagination logic
  public currentPage: number;
  public totalPage: number;
  public currentPageGroup: number[] = [];
  public nthPageGroup: number;

  // search form logic
  public searchForm: FormGroup = this.fb.group({
    query: ''
  });
  public activeQuery: string = '';

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private postService: PostService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router,
              private session: SessionStorageService) { }

  ngOnInit(): void {
    this.session.clearPostParams();
    this.selectedTags = [];
    // pagination and query parsing
    this.route.queryParams.subscribe(param => {
      this.currentPage = parseInt(param['page']);
      const tags:string[] = [].concat(param['tags'] || []);
      const query: string = param['query'];

      // generate tags
      this.tagService.getAllTags()
        .subscribe(res => {
          if (res.success) {

            if (tags) {
              this.allTags = res.tags.filter(tag => tags.indexOf(tag._id) === -1)
                                     .sort((tag1: Tag, tag2: Tag) => {
                                        if (tag1.name < tag2.name)
                                          return -1;
                                        if (tag1.name > tag2.name)
                                          return 1;
                                        return 0;
                                      });
              this.selectedTags = res.tags.filter(tag => tags.indexOf(tag._id) >= 0)
                                          .sort((tag1: Tag, tag2: Tag) => {
                                            if (tag1.name < tag2.name)
                                              return -1;
                                            if (tag1.name > tag2.name)
                                              return 1;
                                            return 0;
                                          });
            } else {
              this.allTags = res.tags;
            }
          }
        });

      // list based on query
      // search by topics
      if (tags.length > 0) {
        this.postService.getCountByTags(tags)
          .subscribe(res => {
            if (res.success) {
              const numPosts = res.count;
              this.totalPage = Math.ceil(numPosts/PAGE_SIZE);
              this.generatePagination(this.currentPage);
            }
          });
        this.postService.getByTags(tags, PAGE_SIZE, this.currentPage)
          .subscribe(res => {
            if (res.success) {
              this.posts = res.posts;
            }
          });
      }
      // search by title query
      else if (query) {
        this.postService.getCountByTitle(query)
          .subscribe(res => {
            if (res.success) {
              const numPosts = res.count;
              this.totalPage = Math.ceil(numPosts/PAGE_SIZE);
              this.generatePagination(this.currentPage);
              console.log("Count works");
            }
          });
        this.postService.getByTitle(query, PAGE_SIZE, this.currentPage)
          .subscribe(res => {
            if (res.success) {
              this.posts = res.posts;
            }
          })
      }
      // no topic, nor search query (get posts only by pages)
      else {
        this.postService.getCount()
          .subscribe(res => {
            if (res.success) {
              const numPosts = res.count;
              this.totalPage = Math.ceil(numPosts/PAGE_SIZE);
              this.generatePagination(this.currentPage);
            }
          });
        this.postService.getAllPosts(PAGE_SIZE, this.currentPage)
          .subscribe(res => {
            if (res.success) {
              this.posts = res.posts;
            }
          });
      }

    });

  }

  openDialog = () : void => {
    const dialogRef = this.dialog.open(TagsDialogComponent, {
      data: {allTags: this.allTags, selectedTags: this.selectedTags},
      width: "700px",
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allTags = result.allTags;
        this.selectedTags = result.selectedTags;
        this.searchForm.get('query').setValue('');
        this.router.navigate(['/posts'], {queryParams: this.generateQueryParams(1)});
      }
    });
  }

  onClickAllTopics():void {
    this.selectedTags = [];
    this.searchForm.get('query').setValue('');
    this.activeQuery = '';
    this.router.navigate(['/posts'], { queryParams: this.generateQueryParams(1) })
  }

  onClickSearch() {
    this.selectedTags = [];
    this.activeQuery = this.searchForm.get('query').value;
    this.router.navigate(['/posts'], { queryParams: this.generateQueryParams(1)});
  }

  saveSession() {
    this.route.queryParams.subscribe(param => {
      this.session.savePostParams(param);
    });
  }

  generatePagination(page: number):void {
    this.nthPageGroup = Math.ceil(page / MAX_PAGINATION);
    this.currentPageGroup = [];
    for (let i = MAX_PAGINATION * (this.nthPageGroup-1) + 1; i <= MAX_PAGINATION * this.nthPageGroup; i++) {
      if (i > this.totalPage) {
        break;
      }
      this.currentPageGroup.push(i);
    }
    // console.log(this.currentPageGroup);
  }

  generateQueryParams(page: number): Params {
    let queryParams: Params = {
      page: page,
      tags: this.selectedTags.length > 0? this.selectedTags.map(tag => tag._id): null,
      query: this.activeQuery !== ''? this.activeQuery: null
    };
    return queryParams;
  }

}

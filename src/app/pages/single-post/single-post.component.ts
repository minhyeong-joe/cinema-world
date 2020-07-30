import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit, OnDestroy {
  public post: Post;
  public sessionParams: Params;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private session: SessionStorageService) { }

  ngOnInit(): void {
    // initialize back to list query from session storage
    this.sessionParams = this.session.getPostParams();
    // get id from url and fetch post data
    this.route.params.subscribe(param => {
      const id = param.id;
      this.postService.getById(id)
        .subscribe(res => {
          if (res.success) {
            this.post = res.post;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.session.clearPostParams();
  }

}

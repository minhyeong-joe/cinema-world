import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  public post: Post;
  public sessionParams: Params;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private session: LocalStorageService) { }

  ngOnInit(): void {
    // initialize back to list query from session storage
    this.sessionParams = this.session.getPostsHistory();
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

}

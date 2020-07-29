import { Component, OnInit, Inject, ComponentFactory } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { TagsDialogComponent } from './tags-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public searchForm = this.fb.group({
    query: ''
  });

  public allTags: string[];
  public selectedTags: string[];

  constructor(public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    // temporary all topic data
    this.allTags = ["Topic One", "Topic Two", "Topic Three"];
    this.selectedTags = [];
  }

  openDialog = () : void => {
    const dialogRef = this.dialog.open(TagsDialogComponent, {
      data: {allTags: this.allTags, selectedTags: this.selectedTags},
      width: "700px",
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  onClickSearch() {
    const query = this.searchForm.get('query').value;
    console.log(query);
  }

}

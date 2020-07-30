import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tag } from 'src/app/core/models/tag';

@Component({
  selector: 'app-topics-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.scss']
})
export class TagsDialogComponent implements OnInit {
  public tempAll: Tag[];
  public tempSelected: Tag[];

  constructor(public dialogRef: MatDialogRef<TagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {allTags: Tag[], selectedTags: Tag[]}) {}

  ngOnInit(): void {
    this.tempAll = this.data.allTags.map(tag => tag);
    this.tempSelected = this.data.selectedTags.map(tag => tag);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({allTags: this.tempAll, selectedTags: this.tempSelected});
  }
}

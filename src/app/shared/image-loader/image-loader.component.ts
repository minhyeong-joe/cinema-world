import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'img-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {
  @Input('src') public src: string;
  @Input('alt') public alt: string = "Image not found";
  @Input('loader') public loaderSrc: string;
  public isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
  }

  onLoad(): void {
    this.isLoading = false;
  }

}

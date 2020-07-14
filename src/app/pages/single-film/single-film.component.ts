import { Component, OnInit } from '@angular/core';
declare var lightGallery: any;

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss']
})
export class SingleFilmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    lightGallery(document.getElementById('lightgallery'), {
      thumbnail: true,
      showThumbByDefault: true,
      zoom: true,
      fullScreen: true
    });
  }

}

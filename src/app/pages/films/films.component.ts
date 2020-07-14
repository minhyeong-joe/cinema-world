import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  tempId: string = 'someTempId';

  constructor() { }

  ngOnInit(): void {
  }

}

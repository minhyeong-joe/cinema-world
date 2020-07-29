import { Component, OnInit } from '@angular/core';
import { APP_TITLE, NAVIGATION } from '../../../environments/constants.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public appTitle: string;
  public navigation: {ABOUT: string, FILMS: string, POSTS: string};

  constructor() { }

  ngOnInit(): void {
    this.appTitle = APP_TITLE;
    this.navigation = NAVIGATION;
  }

}

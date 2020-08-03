import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { APP_TITLE, NAVIGATION } from '../../../environments/constants.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public appTitle: string;
  public navigation: {ABOUT: string, FILMS: string, POSTS: string};

  public collapsed : boolean = true;

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.appTitle = APP_TITLE;
    this.navigation = NAVIGATION;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.collapseMenu();
    }
  }


  collapseMenu() {
    const menu = document.getElementById('navbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    menu.classList.remove('show');
    toggler.attributes['aria-expanded'].value = false;
    toggler.classList.add('collapsed');
  }
}

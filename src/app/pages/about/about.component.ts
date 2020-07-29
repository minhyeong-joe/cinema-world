import { Component, OnInit } from '@angular/core';
import { ABOUT, CONTACT } from '../../../environments/constants.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public abouts: {HEADING: string, URL: string, DESCRIPTION: string}[];
  public contact: {PHONE: string, EMAIL: string, ADDRESS: {STREET: string, CITY: string, STATE: string, ZIP: string}, GOOGLE_MAP: string};

  constructor() { }

  ngOnInit(): void {
    this.abouts = ABOUT;
    this.contact = CONTACT;
  }

}

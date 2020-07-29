import { Component, OnInit } from '@angular/core';
import { FOOTER } from '../../../environments/constants.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footer: {CONTENT: string, SUB_CONTENT: string, COPYRIGHT: string}

  constructor() { }

  ngOnInit(): void {
    this.footer = FOOTER;
  }

}

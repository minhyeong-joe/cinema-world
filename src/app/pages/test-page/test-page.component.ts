import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  @Input() test:string = "hi";

  constructor() { }

  ngOnInit() {
  }

}

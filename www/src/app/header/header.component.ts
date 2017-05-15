import { Component, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private items: {
    title: string;
    path: string;
  }[];

  constructor() { }

  ngOnInit() {
    this.items = [{
      title: 'Foo',
      path: '#/foo'
    }, {
      title: 'Bar',
      path: '#/bar'
    }];
  }

}

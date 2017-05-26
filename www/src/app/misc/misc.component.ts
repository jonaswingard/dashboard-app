import { Component, OnInit } from '@angular/core';
import { MiscService } from './misc.service';

@Component({
  selector: 'app-misc',
  providers: [ MiscService ],
  templateUrl: './misc.component.html'
})
export class MiscComponent implements OnInit {
  items: [{}];
  query: string;
  realtime: [{}];

  constructor(private miscService: MiscService) {
    this.query = 'östermalmstorg';
  }

  ngOnInit() {
    this.miscService.get(this.query).subscribe(items => this.items = items);
  }

  onSearch() {
    this.miscService.get(this.query).subscribe(items => this.items = items);
  }

  onSelect(item) {
    console.log(item);
    this.miscService.getRealtime(item.SiteId).subscribe(realtime => this.realtime = realtime);
  }
}

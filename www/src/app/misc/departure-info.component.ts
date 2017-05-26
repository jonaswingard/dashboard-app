import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-departure-info',
  templateUrl: './departure-info.component.html'
})
export class DepartureInfoComponent implements OnInit {
  @Input() items: [{}];
  @Input() departureTitle: string;

  ngOnInit(): void {
    console.log(this.items);
  }
}

import { Component, OnInit } from '@angular/core';
import { TrafficService } from './traffic.service';
import { ITraffic } from './traffic';

@Component({
  selector: 'app-traffic',
  providers: [ TrafficService ],
  templateUrl: './traffic.component.html'
})
export class TrafficComponent implements OnInit {
  private traffic: ITraffic;

  constructor(private trafficService: TrafficService) { }

  ngOnInit() {
    this.trafficService.get().subscribe(traffic => this.traffic = traffic);
  }

  onToggle() {
    console.log('hmm');
    // trafficType.isVisible = !trafficType.isVisible;
  }
}

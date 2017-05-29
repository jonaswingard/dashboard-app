import { Component, OnInit } from '@angular/core';
import { TrafficService } from '../traffic.service';

@Component({
  selector: 'app-traffic-realtime',
  providers: [ TrafficService ],
  templateUrl: './traffic-realtime.component.html'
})
export class TrafficRealtimeComponent implements OnInit {
  siteId = '9206';
  stopTitle = 'Östermalmstorg';
  realtimeInfo: any;

  constructor (private trafficService: TrafficService) {}

  ngOnInit() {
    this.trafficService.getRealtime(this.siteId).subscribe(realtimeInfo => this.realtimeInfo = realtimeInfo);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { TrafficService } from '../traffic.service';

@Component({
  selector: 'traffic-realtime',
  providers: [ TrafficService ],
  templateUrl: './realtime.component.html'
})
export class RealtimeComponent implements OnInit {
  @Input() ComponentTitle: string;
  @Input() SiteId: string;
  realtimeInfo: any;

  constructor (private trafficService: TrafficService) {}

  ngOnInit() {
    this.trafficService.getRealtime(this.SiteId).subscribe(realtimeInfo => this.realtimeInfo = realtimeInfo);
  }
}

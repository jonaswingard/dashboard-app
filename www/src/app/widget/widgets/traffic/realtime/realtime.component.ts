import { Component, OnInit, Input } from '@angular/core';

import { TrafficService } from '../traffic.service';
import { WidgetComponent } from '../../widget.component';

@Component({
  selector: 'traffic-realtime',
  providers: [ TrafficService ],
  templateUrl: './realtime.component.html'
})
export class RealtimeComponent extends WidgetComponent implements OnInit {
  realtimeInfo: any;

  constructor (private trafficService: TrafficService) {
    super();
  }

  ngOnInit() {
    if (this.getSetting('Visible') && this.getSetting('SiteId')) {
      this.trafficService.getRealtime(this.getSetting('SiteId')).subscribe(realtimeInfo => this.realtimeInfo = realtimeInfo);
    }
  }
}

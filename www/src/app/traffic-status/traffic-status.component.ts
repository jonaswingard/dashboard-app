import { Component, OnInit } from '@angular/core';
import { TrafficStatusService } from './traffic-status.service';
import { ITrafficStatus } from './traffic-status';

@Component({
  selector: 'app-traffic-status',
  providers: [ TrafficStatusService ],
  templateUrl: './traffic-status.component.html'
})
export class TrafficStatusComponent implements OnInit {
  private trafficStatus: ITrafficStatus;

  constructor(private trafficStatusService: TrafficStatusService) { }

  ngOnInit() {
    this.trafficStatusService.get().subscribe(trafficStatus => this.trafficStatus = trafficStatus);
  }
}

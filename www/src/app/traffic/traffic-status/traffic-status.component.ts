import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { TrafficService } from '../traffic.service';

@Component({
  selector: 'traffic-status',
  providers: [ TrafficService ],
  templateUrl: './traffic-status.component.html'
})
export class TrafficStatusComponent implements OnInit {
  @Input() ComponentTitle: string = 'Trafikläget';
  trafficStatus: any;

  constructor(private trafficService: TrafficService) { }

  ngOnInit() {
    this.trafficService.getInfo().subscribe(trafficStatus => this.trafficStatus = trafficStatus);
  }
}

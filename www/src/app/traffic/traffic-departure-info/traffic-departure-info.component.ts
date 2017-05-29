import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traffic-departure-info',
  templateUrl: './traffic-departure-info.component.html'
})
export class TrafficDepartureInfoComponent {
  @Input() items: [{}];
  @Input() departureTitle: string;
}
